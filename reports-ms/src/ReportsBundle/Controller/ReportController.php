<?php
namespace ReportsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ReportController extends Controller
{
    /**
     * @Route("/reports/products-by-warehouses-and-orders", name="reports_products_by_warehouses_and_orders")
     */

    public function productsByWarehousesAndOrdersAction()
    {
        $graphqlQuery = <<<GQL
                        query {
                            getTotalStockByProducts {
                                total
                                    byProduct {
                                        productSku
                                        totalQuantity
                                    }
                            }
                        }
GQL;

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => json_encode(['query' => $graphqlQuery]),
            ],
        ];

        try {
            // 2. Pedir stocks al Store
            $context = stream_context_create($options);
            $response = @file_get_contents(getenv('WAREHOUSE_MS_URL'), false, $context);

            if ($response === false) {
                return new JsonResponse([
                    'error' => 'Could not connect to the Warehouse service',
                    'service' => 'WAREHOUSE_MS',
                ], 502);
            }


            $data = json_decode($response, true);

            if (isset($data['errors'])) {
                return new JsonResponse([
                    'error' => 'The Warehouse service returned an error',
                    'details' => $data['errors'],
                ], 500);
            }

            $byStoke = $data['data']['getTotalStockByProducts']['byProduct'] ?? [];

            // 2. Pedir pedidos al Store
            $storeResponse = @file_get_contents(getenv('STORE_MS_URL') . '/order/orders-by-products');

            if ($storeResponse === false) {
                return new JsonResponse([
                    'error' => 'Could not connect to the Store service',
                    'service' => 'STORE_MS',
                ], 502);
            }

            $storeData = json_decode($storeResponse, true);
            $byOrders = $storeData['data'] ?? [];

            // 3. Combinar resultados
            $result = [];
            foreach ($byStoke as $stoke) {
                $productSku = $stoke['productSku'];

                $result[] = [
                    'productSku' => $productSku,
                    'totalStoke' => $stoke['totalQuantity'],
                    'totalOrders' => $byOrders[$productSku]['totalQuantity'] ?? 0
                ];
            }

            $res['data'] = $result;

            return new JsonResponse($res);

        } catch (\Throwable $e) {
            return new JsonResponse([
                'error' => 'Unexpected error in Reports',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * @Route("/reports/product-movements", name="reports_product_movements")
     */
    public function productMovementsAction(Request $request)
    {
        $productSku = $request->query->get('productSku');
        $startDate = $request->query->get('startDate');
        $endDate = $request->query->get('endDate');

        if (!$productSku) {
            return new JsonResponse(
                ['error' => 'productSku is required'],
                400
            );
        }

        $graphqlQuery = <<<GQL
        query (\$productSku: String!, \$startDate: String, \$endDate: String) {
            productMovements(productSku: \$productSku, startDate: \$startDate, endDate: \$endDate) {
                id
                productSku
                quantity
                type
                fromWarehouseId
                toWarehouseId
                note
                createdAt
            }
        }
GQL;

        $variables = [
            'productSku' => $productSku,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => json_encode([
                    'query' => $graphqlQuery,
                    'variables' => $variables,
                ]),
            ],
        ];

        try {
            $context = stream_context_create($options);
            $response = @file_get_contents(getenv('WAREHOUSE_MS_URL'), false, $context);

            if ($response === false) {
                return new JsonResponse([
                    'error' => 'Could not connect to the Warehouse service',
                    'service' => 'WAREHOUSE_MS',
                ], 500);
            }

            $data = json_decode($response, true);

            if (isset($data['errors'])) {
                return new JsonResponse([
                    'error' => 'GraphQL error',
                    'details' => $data['errors'],
                ], 500);
            }

            $result['data'] = $data['data']['productMovements'] ?? [];

            return new JsonResponse($result);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Exception',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @Route("/reports/orders", name="reports_orders")
     */
    public function ordersAction(Request $request)
    {
        $startDate = $request->query->get('startDate');
        $endDate = $request->query->get('endDate');

        $variables = [
            'startDate' => $startDate,
            'endDate' => $endDate,
        ];

        $options = [
            'http' => [
                'method' => 'GET',
                'header' => "Content-Type: application/json\r\n",
                'content' => json_encode([
                    'variables' => $variables,
                ]),
            ],
        ];

        try {
            $context = stream_context_create($options);
            $storeResponse = @file_get_contents(getenv('STORE_MS_URL') . '/order', false, $context);

            if ($storeResponse === false) {
                return new JsonResponse([
                    'error' => 'Could not connect to the Store service',
                    'service' => 'STORE_MS',
                ], 502);
            }

            $storeData = json_decode($storeResponse, true);
            $orders['data'] = $storeData['data'] ?? [];

            return new JsonResponse($orders);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Exception',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

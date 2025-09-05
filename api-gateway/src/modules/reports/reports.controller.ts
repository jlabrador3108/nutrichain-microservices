import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { QueryGetOrdersDto } from '../store/dto/query-get-orders.dto';
import { QueryGetMovementsByProductDto } from './dto/query-get-movements-product.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/orders')
  getOrders(@Query() query: QueryGetOrdersDto) {
    return this.reportsService.getOrders(query);
  }
  
  @Get('/product-movements')
  getMovementsByProduct(@Query() query: QueryGetMovementsByProductDto) {
    return this.reportsService.getMovementsByProduct(query);
  }
  
  @Get('/products-by-warehouses-and-orders')
  getProductsWarehousesOrders() {
    return this.reportsService.getProductsWarehousesOrders();
  }
}

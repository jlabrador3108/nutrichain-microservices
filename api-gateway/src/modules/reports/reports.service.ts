import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';
import { envs } from 'src/common/config/envs';
import { ResponseHandler } from 'src/common/utils/response-handler';
import { QueryGetOrdersDto } from '../store/dto/query-get-orders.dto';
import { QueryGetMovementsByProductDto } from './dto/query-get-movements-product.dto';

@Injectable()
export class ReportsService {
  private http = axios.create({ baseURL: envs.reportsServiceUrl + '/reports' });
  async getOrders(query: QueryGetOrdersDto) {
    try {
      const { data } = await this.http.get(`/orders`, { params: query });
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Reports service unavailable');
    }
  }

  async getMovementsByProduct(query: QueryGetMovementsByProductDto) {
    try {
      const { data } = await this.http.get(`/product-movements`, { params: query });
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Reports service unavailable');
    }
  }

  async getProductsWarehousesOrders() {
    try {
      const { data } = await this.http.get(`/products-by-warehouses-and-orders`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Reports service unavailable');
    }
  }
}

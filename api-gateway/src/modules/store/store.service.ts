import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';
import { envs } from 'src/common/config/envs';
import { ResponseHandler } from 'src/common/utils/response-handler';
import { QueryGetOrdersDto } from './dto/query-get-orders.dto';

@Injectable()
export class StoreService {
  private http = axios.create({ baseURL: envs.storeServiceUrl });

  async createOrder(dto: any) {
    try {
      const { data } = await this.http.post('/order', dto);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Store service unavailable');
    }
  }

  async getOrders(query: QueryGetOrdersDto) {
    try {
      const { data } = await this.http.get(`/order`, { params: query });
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Store service unavailable');
    }
  }

  async getOrderById(id: string) {
    try {
      const { data } = await this.http.get(`/order/${id}`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Store service unavailable');
    }
  }

  async getOrdersByProducts() {
    try {
      const { data } = await this.http.get(`/order/orders-by-products`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Store service unavailable');
    }
  }
}

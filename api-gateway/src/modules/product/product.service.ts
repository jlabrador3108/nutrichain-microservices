import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';
import { envs } from 'src/common/config/envs';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryElsProductDto } from './dto/query-els-product.dto';
import { ResponseHandler } from 'src/common/utils/response-handler';

@Injectable()
export class ProductService {
  private http = axios.create({ baseURL: envs.productServiceUrl });

  async createProduct(dto: CreateProductDto) {
    try {
      const { data } = await this.http.post('/product', dto);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    try {
      const { data } = await this.http.patch(`/product/${id}`, dto);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async listProducts() {
    try {
      const { data } = await this.http.get('/product');
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async findById(id: number) {
    try {
      const { data } = await this.http.get(`/product/${id}`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async remove(id: number) {
    try {
      const { data } = await this.http.delete(`/product/${id}`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async findBySku(sku: string) {
    try {
      const { data } = await this.http.get(`/product/sku/${sku}`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async findEls(query: QueryElsProductDto) {
    try {
      if (!query.categoryFoodId && !query.name)
        throw new ServiceUnavailableException(
          'At least one query param is required. name or categoryFoodId',
        );

      const { data } = await this.http.get(`/product/els`, { params: query });
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async getCategories() {
    try {
      const { data } = await this.http.get(`/product/categories`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }

  async getUnitMeasurement() {
    try {
      const { data } = await this.http.get(`/product/unit-measurement`);
      return data;
    } catch (e) {
      if (e?.response?.data) ResponseHandler.error(e.response.data);
      throw new ServiceUnavailableException('Product service unavailable');
    }
  }
}

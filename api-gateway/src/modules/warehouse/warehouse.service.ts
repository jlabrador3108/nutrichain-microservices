import {
  Injectable,
  HttpException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { envs } from 'src/common/config/envs';
import { GetStockDto } from './dto/get-stock.dto';
import { MovementDto } from './dto/movement.dto';

@Injectable()
export class WarehouseService {
  private readonly graphqlUrl = envs.warehouseServiceUrl;

  async getWarehouses() {
    const query = `
      query {
        warehouses {
          id name manager createdAt updatedAt
          location { address lat lon }
        }
      }
    `;
    return this.executeGraphql(query);
  }

  async getStock(dto: GetStockDto) {
    const query = `
      query($productSku: String!, $warehouseId: ID!) {
        stock(productSku: $productSku, warehouseId: $warehouseId) {
          id productSku warehouseId quantity updatedAt
        }
      }
    `;
    return this.executeGraphql(query, dto);
  }

  async createWarehouse(dto: CreateWarehouseDto) {
    const query = `
      mutation($name: String!, $location: LocationInput!, $manager: String) {
        createWarehouse(name: $name, location: $location, manager: $manager) {
          id name manager createdAt updatedAt
          location { address lat lon }
        }
      }
    `;
    return this.executeGraphql(query, dto);
  }

  async registerEntry(dto: MovementDto) {
    const query = `
      mutation($productSku: String!, $warehouseId: ID!, $quantity: Int!, $note: String) {
        registerEntry(productSku: $productSku, warehouseId: $warehouseId, quantity: $quantity, note: $note) {
          id productSku quantity type fromWarehouseId toWarehouseId note createdAt
        }
      }
    `;
    return this.executeGraphql(query, dto);
  }

  async registerExit(dto: MovementDto) {
    const query = `
      mutation($productSku: String!, $warehouseId: ID!, $quantity: Int!, $note: String) {
        registerExit(productSku: $productSku, warehouseId: $warehouseId, quantity: $quantity, note: $note) {
          id productSku quantity type fromWarehouseId toWarehouseId note createdAt
        }
      }
    `;
    return this.executeGraphql(query, dto);
  }

  private async executeGraphql(query: string, variables?: any) {
    try {
      const { data } = await axios.post(this.graphqlUrl, {
        query,
        variables,
      });

      if (data.errors) {
        throw new HttpException(data.errors, 400);
      }

      return data.data;
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw new ServiceUnavailableException('Warehouse service unavailable');
    }
  }
}

import { AppDataSource } from "../../../common/data-access/data-source";
import { ResponseHandler } from "../../../common/utils/response-handler";
import { Response, SingleResponse, MessageResponse } from "../../../common/interfaces/response-interfaces";
import Product from "../models/product.persistence.entity";
import CategoryFood from "../models/category-food.persistence.entity";
import UnitMeasurement from "../models/unit-measurement.persistence.entity";

export class ProductService {
  private repo = AppDataSource.getRepository(Product);
  private repoCategoryFood = AppDataSource.getRepository(CategoryFood);
  private repoUnitMeasurement = AppDataSource.getRepository(UnitMeasurement);

  /**
   * Obtiene todos los productos con count.
   */
  async getAll(): Promise<Response<Product>> {
    const [data, count] = await this.repo.findAndCount();
    return {
      data,
      meta: { total: count },
    };
  }

  /**
   * Obtiene un producto por ID.
   */
  async getById(id: number): Promise<SingleResponse<Product>> {
    const product = await this.repo.findOneBy({ id });
    if (!product) {
      throw ResponseHandler.error({
        message: `Product with id: ${id} not found`,
        statusCode: 404,
      });
    }
    return { data: product };
  }

  /**
   * Obtiene un producto por SKU.
   */
  async getBySku(sku: string): Promise<SingleResponse<Product>> {
    const product = await this.repo.findOneBy({ sku });
    if (!product) {
      throw ResponseHandler.error({
        message: `Product with sku: ${sku} not found`,
        statusCode: 404,
      });
    }
    return { data: product };
  }

  /**
   * Soft delete de un producto por ID.
   */
  async delete(id: number): Promise<MessageResponse> {
    const result = await this.repo.softDelete(id);

    if (result.affected === 0) {
      throw ResponseHandler.error({
        message: `Product with id: ${id} not found`,
        statusCode: 404,
      });
    }

    return { message: "Product removed" };
  }

  async getCategories(): Promise<Response<CategoryFood>> {
    const [data, count] = await this.repoCategoryFood.findAndCount();
    return {
      data,
      meta: { total: count },
    };
  }

  async getUnitMeasurement(): Promise<Response<UnitMeasurement>> {
    const [data, count] = await this.repoUnitMeasurement.findAndCount();
    return {
      data,
      meta: { total: count },
    };
  }
}

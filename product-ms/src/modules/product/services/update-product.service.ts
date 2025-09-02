import { Not } from "typeorm";
import { AppDataSource } from "../../../common/data-access/data-source";
import { ResponseHandler } from "../../../common/utils/response-handler";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { SingleResponse } from "../../../common/interfaces/response-interfaces";
import CategoryFood from "../models/category-food.persistence.entity";
import Product from "../models/product.persistence.entity";
import UnitMeasurement from "../models/unit-measurement.persistence.entity";

export class UpdateProductService {
  private productRepo = AppDataSource.getRepository(Product);
  private categoryFoodRepo = AppDataSource.getRepository(CategoryFood);
  private unitMeasurementRepo = AppDataSource.getRepository(UnitMeasurement);

  async update(id: number, data: UpdateProductDto): Promise<SingleResponse<Product>> {
    if (data.categoryFoodId) {
      const category = await this.categoryFoodRepo.findOne({ where: { id: data.categoryFoodId } });
      if (!category) {
        throw ResponseHandler.error({
          message: `CategoryFood with id: ${data.categoryFoodId} not found`,
          statusCode: 400,
        });
      }
    }

    if (data.unitMeasurementId) {
      const unit = await this.unitMeasurementRepo.findOne({ where: { id: data.unitMeasurementId } });
      if (!unit) {
        throw ResponseHandler.error({
          message: `UnitMeasurement with id: ${data.unitMeasurementId} not found`,
          statusCode: 400,
        });
      }
    }

    if (data.sku) {
      const existingSku = await this.productRepo.findOne({
        where: { sku: data.sku, id: Not(id) },
      });
      if (existingSku) {
        throw ResponseHandler.error({
          message: `Product with sku: ${data.sku} already exists`,
          statusCode: 400,
        });
      }
    }

    // Actualizar producto
    await this.productRepo.update(id, data);

    const updatedProduct = await this.productRepo.findOne({ where: { id } });
    if (!updatedProduct) {
      throw ResponseHandler.error({
        message: `Product with id: ${id} not found after update`,
        statusCode: 404,
      });
    }

    return { data: updatedProduct };
  }
}

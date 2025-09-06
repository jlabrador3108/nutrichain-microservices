import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductService } from "../services/create-product.service";
import { UpdateProductService } from "../services/update-product.service";
import { FindElsProductService } from "../services/find-els-product.service";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { Response as ResponseInterface, SingleResponse, MessageResponse } from "../../../common/interfaces/response-interfaces";
import { FindElsProductQuery } from "../dtos/find-els-product.dto";

export class ProductController {
  private productService = new ProductService();
  private createService = new CreateProductService();
  private updateService = new UpdateProductService();
  private findElsService = new FindElsProductService();

  /** GET /product */
  async getAll(req: Request, res: Response<ResponseInterface<any>>, next: NextFunction) {
    try {
      const products = await this.productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  /** POST /product */
  async create(req: Request<{}, {}, CreateProductDto>, res: Response<SingleResponse<any>>, next: NextFunction) {
    try {
      const product = await this.createService.create(req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  /** PUT /products/:id */
  async update(req: Request<{ id: string }, {}, UpdateProductDto>, res: Response<SingleResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new Error("Invalid product id");

      const product = await this.updateService.update(id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  /** DELETE /product/:id */
  async delete(req: Request<{ id: string }>, res: Response<MessageResponse>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new Error("Invalid product id");

      const result = await this.productService.delete(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  /** GET /product/sku/:sku */
  async getBySku(req: Request<{ sku: string }>, res: Response<SingleResponse<any>>, next: NextFunction) {
    try {
      const { sku } = req.params;
      const product = await this.productService.getBySku(sku);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  /** GET /product/:id */
  async getById(req: Request<{ id: string }>, res: Response<SingleResponse<any>>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new Error("Invalid product id");

      const product = await this.productService.getById(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  /** GET /product/search */
  async findEls(req: Request<{}, {}, {}, FindElsProductQuery>, res: Response<ResponseInterface<any>>, next: NextFunction) {
    try {
      const query = req.query;
      const product = await this.findElsService.findEls(query);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req: Request, res: Response<ResponseInterface<any>>, next: NextFunction) {
    try {
      const categories = await this.productService.getCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  async getUnitMeasurement(req: Request, res: Response<ResponseInterface<any>>, next: NextFunction) {
    try {
      const unitMeasurement = await this.productService.getUnitMeasurement();
      res.json(unitMeasurement);
    } catch (err) {
      next(err);
    }
  }
}

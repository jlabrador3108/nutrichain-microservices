import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { httpClient } from 'src/common/utils/httpClient';
import { envs } from 'src/common/config/envs';

@Injectable()
export class ProductService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = envs.productServiceUrl;
  }


  async create(createProductDto: CreateProductDto) {
    const { data } = await httpClient.post(`${this.baseUrl}/order`, createProductDto);
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

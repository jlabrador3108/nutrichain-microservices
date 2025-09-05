import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryGetOrdersDto } from './dto/query-get-orders.dto';

@ApiTags('order')
@Controller('order')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.service.createOrder(dto);
  }

  @Get()
  getAll(@Query() query: QueryGetOrdersDto) {
    return this.service.getOrders(query);
  }

  @Get('/orders-by-products')
  getOrdersByProducts() {
    return this.service.getOrdersByProducts();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getOrderById(id);
  }
}

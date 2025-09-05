import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { MovementDto } from './dto/movement.dto';
import { GetStockDto } from './dto/get-stock.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  getWarehouses() {
    return this.warehouseService.getWarehouses();
  }

  @Get('stock')
  getStock(@Query() query: GetStockDto) {
    return this.warehouseService.getStock(query);
  }

  @Post()
  createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(dto);
  }

  @Post('entry')
  registerEntry(@Body() dto: MovementDto) {
    return this.warehouseService.registerEntry(dto);
  }

  @Post('exit')
  registerExit(@Body() dto: MovementDto) {
    return this.warehouseService.registerExit(dto);
  }
}

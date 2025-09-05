import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { StoreModule } from './modules/store/store.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [ProductModule, WarehouseModule, StoreModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

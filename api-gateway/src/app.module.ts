import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductsModule, ProductModule, StockModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

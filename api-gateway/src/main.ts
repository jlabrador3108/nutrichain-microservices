import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe as NestValidationPipe, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalPipes(
    new NestValidationPipe({ whitelist: true, transform: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway for NutriChain microservices')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5000);

  console.log(
    `API Gateway listening on http://localhost:${process.env.PORT} (Swagger /docs)`,
  );
}
bootstrap();

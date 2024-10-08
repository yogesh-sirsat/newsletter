import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import * as yaml from 'yaml'; // YAML conversion library

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Newsletter API')
    .setDescription('Newsletter API documentation in detail.')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

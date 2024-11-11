import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf-8',
  });

  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(process.env.PORT ?? 4000);

  console.log(`Server is running on http://localhost:${process.env.PORT}`);
}
bootstrap();

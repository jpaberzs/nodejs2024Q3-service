import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  app.useGlobalPipes(new ValidationPipe());

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf-8',
  });

  try {
    await prismaService.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
  }

  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(process.env.PORT ?? 4000);

  console.log(`Server is running on http://localhost:${process.env.PORT}`);
}
bootstrap();

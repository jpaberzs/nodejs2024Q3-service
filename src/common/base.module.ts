import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BaseService } from './services/base.service';
import { BaseController } from './controllers/base.controller';

@Module({
  providers: [
    PrismaService,
    {
      provide: BaseService,
      useFactory: (prisma: PrismaService) => new BaseService(prisma, 'user'),
      inject: [PrismaService],
    },
  ],
  controllers: [BaseController],
})
export class BaseModule {}

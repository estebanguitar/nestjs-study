import { Module } from '@nestjs/common';
import { ExceptController } from './except.controller';

@Module({
  controllers: [ExceptController]
})
export class ExceptModule {}

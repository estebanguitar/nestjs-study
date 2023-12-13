import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Module({
  // imports: [],
  // controllers: [],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class AuthModule { }

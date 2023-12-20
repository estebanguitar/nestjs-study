import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtAuthGuard } from 'src/auth/auth.guard'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { User } from 'src/entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard],
})
export class UserModule {}

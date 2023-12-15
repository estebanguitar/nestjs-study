import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/env';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      global: true,
      signOptions: { expiresIn: 60 * 60 }
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard]
})
export class UserModule { }

import { DynamicModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export class DBModuleContainer {
  static options(dir: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: process.env.DATABASE_LOGGING === 'true',
      entities: [join(dir, process.env.DATABASE_ENTITIES + '.{ts,js}')],
      // migrations: [join(dir, (process.env.DATABASE_MIGRATIONS + '.{ts,js}'))],
    }
  }
  static forRoot(dir: string): DynamicModule {
    return TypeOrmModule.forRoot(this.options(dir))
  }
}

export class JwtModuleContainer {
  static register(): DynamicModule {
    return JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(process.env.ACCESS_JWT_EXPIRES) || 60 * 60,
        },
      }),
    })
  }
}

export class PassportModuleContainer {
  static register(): DynamicModule {
    return PassportModule.register({ defaultStrategy: 'jwt' })
  }
}

export class ConfigModuleContainer {
  static forRoot(): DynamicModule {
    return ConfigModule.forRoot({ isGlobal: true })
  }
}

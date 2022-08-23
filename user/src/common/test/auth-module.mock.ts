import { DynamicModule, Module } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AUTH_CLIENT } from 'src/auth/auth.constant'
import { AuthService } from 'src/auth/auth.service'
import { ConfigModuleMock } from './config-module.mock'

@Module({})
export class AuthModuleMock {
  static register(authClient: ClientProxy): DynamicModule {
    return {
      module: AuthModuleMock,
      providers: [
        AuthService,
        {
          provide: AUTH_CLIENT,
          useValue: authClient,
        },
      ],
      imports: [ConfigModuleMock],
      exports: [AuthService],
    }
  }
}

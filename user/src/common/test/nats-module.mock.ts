import { DynamicModule, Module } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { NATS_CLIENT } from 'src/nats/nats.constants'
import { ConfigModuleMock } from './config-module.mock'

@Module({})
export class NatsModuleMock {
  static register(clientProxy: ClientProxy): DynamicModule {
    return {
      module: NatsModuleMock,
      providers: [
        {
          provide: NATS_CLIENT,
          useValue: clientProxy,
        },
      ],
      imports: [ConfigModuleMock],
      exports: [NATS_CLIENT],
    }
  }
}

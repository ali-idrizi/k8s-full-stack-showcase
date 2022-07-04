import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { ITokenPair } from './app.interface'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'generateTokenPair' })
  generateTokenPair(@Payload('userId') userId: string): ITokenPair {
    if (!userId) {
      throw new RpcException('userId is required')
    }

    return this.appService.generateTokenPair(userId)
  }
}

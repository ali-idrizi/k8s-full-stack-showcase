import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { IGenerateTokenPairBody, ITokenPair } from './app.interface'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate')
  generateTokenPair(
    @Body() body: IGenerateTokenPairBody,
    @Res({ passthrough: true }) response: Response,
  ): ITokenPair {
    const tokens = this.appService.generateTokenPair(body.userId)

    response.cookie('jwt', tokens.jwt, {
      secure: true,
    })

    response.cookie('refresh-token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    })

    return tokens
  }
}

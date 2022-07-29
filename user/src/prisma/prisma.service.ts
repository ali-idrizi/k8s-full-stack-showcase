import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

const CONNECT_RETRIES = 10
const CONNECT_DELAY = 5000

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    for (let i = 0; i < CONNECT_RETRIES; i++) {
      try {
        await this.$connect()
        break
      } catch (e) {
        if (i === CONNECT_RETRIES - 1) throw e

        await new Promise((resolve) => setTimeout(resolve, CONNECT_DELAY))
      }
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}

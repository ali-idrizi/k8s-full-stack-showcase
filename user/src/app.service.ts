import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from './prisma/prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  async addUser(name: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
      },
    })
  }
}

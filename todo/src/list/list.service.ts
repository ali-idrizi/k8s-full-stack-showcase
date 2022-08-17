import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}
}

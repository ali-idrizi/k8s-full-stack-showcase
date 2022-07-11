import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDb } from 'src/user.db'
import { RegisterDto } from './register.dto'
import { IRegisterRes } from './register.interface'

@Injectable()
export class RegisterService {
  private readonly userDb: UserDb

  constructor(private authService: AuthService, prisma: PrismaService) {
    this.userDb = new UserDb(prisma)
  }

  async register(registerDto: RegisterDto): Promise<IRegisterRes> {
    return {
      success: true,
    }
  }
}

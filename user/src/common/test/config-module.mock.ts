import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Environment } from 'src/user.interface'

export const TEST_ENV: Environment = {
  NATS_URL: '',
  JWT_COOKIE_NAME: 'jwt',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh-token',
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [
        (): Environment => {
          // Delete variables defined in `ENV` from `process.env`
          // TODO: Use `ignoreEnvVarsOnGet` when https://github.com/nestjs/config/pull/997 is merged
          Object.keys(TEST_ENV).forEach((key) => delete process.env[key])

          return TEST_ENV
        },
      ],
    }),
  ],
})
export class ConfigModuleMock {}

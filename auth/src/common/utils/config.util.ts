import { ConfigService } from '@nestjs/config'

export const ConfigUtil = {
  /**
   * Get the value of an environment variable, throws an error if it's missing
   *
   * @param configService the nestjs config service
   * @param key the key of the environment variable
   *
   * @returns the value of the environment variable
   * @throws if the environment variable is missing
   */
  getEnv(configService: ConfigService, key: string): string {
    const value = configService.get<string>(key)

    if (!value) {
      throw new Error(`Requested environment variable "${key}" not found`)
    }

    return value
  },

  /**
   * Get the values of multiple environment variables using an arroy of keys,
   * throws an error if any is missing
   *
   * @param configService the nestjs config service
   * @param keys array of keys of the environment variable
   *
   * @returns an array of the values of the environment variables
   * @throws if any environment variable is missing
   */
  getMultiple(configService: ConfigService, keys: string[]): string[] {
    return keys.map((key) => this.getEnv(configService, key))
  },
}

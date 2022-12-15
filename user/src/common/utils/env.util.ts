export const EnvUtil = {
  isDev(): boolean {
    return process.env.NODE_ENV !== 'production'
  },

  isProd(): boolean {
    return !this.isDev()
  },
}

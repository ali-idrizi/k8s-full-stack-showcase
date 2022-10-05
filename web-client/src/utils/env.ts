export function isServer(): boolean {
  return typeof window === 'undefined'
}

export function isDev(): boolean {
  return process.env.NODE_ENV !== 'production'
}

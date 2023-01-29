export function isServer(): boolean {
  return typeof window === 'undefined'
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isDev(): boolean {
  return process.env.NODE_ENV !== 'production'
}

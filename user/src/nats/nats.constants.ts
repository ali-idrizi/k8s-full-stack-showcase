export const NATS_CLIENT = Symbol('NATS_CLIENT')

export const COMMAND = {
  auth: {
    genTokens: 'auth:genTokens',
    validateJwt: 'auth:validateJwt',
    refreshJwt: 'auth:refreshJwt',
    removeRefreshToken: 'auth:removeRefreshToken',
  },
  todo: {
    userCreated: 'todo:userCreated',
  },
}

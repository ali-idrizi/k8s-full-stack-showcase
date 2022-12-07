# Auth Microservice

This microservice is a Nest.js app that handles generating JWT and refresh tokens. It listens for the following NATS `MessagePattern`:

- `auth:genTokens`: expects `userId` and returns a JWT and a refresh token
- `auth:validateJwt`: expects `jwt` input and returns the `userId` and `expired` fields
- `auth:refreshJwt`: expects `refreshToken` and returns a JWT and a new refresh token
- `auth:removeRefreshToken`: removes the provided `refreshToken`, thus invalidating the session

## Commands

- `npm run lint`: lint the source code
- `npm run test`: run unit tests

## Database

Prisma.io is used as ORM. Currently only a single table is created that stores refresh tokens and associates them with a `userId`.

## Health

- `/health/live`: always responds with `OK`
- `/health/ready`: responds with `OK` if connected to both NATS and the database

## TODO

- **Add a CronJob to delete expired refresh tokens**
- **Refactor refresh tokens**: currently refresh tokens are randomly generated strings and stored plainly in the database. The recommended solution is refresh tokens to be JWTs with a `jit` claim that is stored in the database instead
- **Improve refresh JWT flow**: currently when a request to renew a JWT is received, the refresh token is immediately deleted from the database. This can fail and the user will be logged out if for any reason they didn't get the newly generated refresh token (e.g. network failure). Perhaps we can keep the entry in the database and mark it as used, and only allow reusing the token for a limited time by the same IP address that used is earlier?

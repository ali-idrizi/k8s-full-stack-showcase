# User Microservice

This microservice is a Nest.js app that stores user details and exposes a REST API to register users and authenticate them. It listens to the following endpoints:

- `/login`:
  - `POST`: expects `email` and `password`, if valid stores auth tokens in cookies
- `/register`
  - `POST`: expects `name`, `email`, `password` and `confirmPassword`, if valid stores auth tokens in cookies
- `/logout`
  - `POST`: invalidates the provided refresh tokens and clears auth cookies
- `/auth/refresh-token`
  - `POST`: triggers the refresh JWT flow, storing new auth tokens in cookies
- `/auth`
  - `GET`: used by ingress-nginx sub-request to authenticate requests. If the JWT is valid it responds with `X-User-ID` and `X-Authenticated` headers that are forwarded to other microservices upstream. This endpoint is not exposed outside the cluster

## Commands

- `npm run lint`: lint the source code
- `npm run test`: run unit tests

## Database

Prisma.io is used as ORM. Currently only a single table is created that stores user details such as name, email, hashed password…

## Health

- `/health/live`: always responds with `OK`
- `/health/ready`: responds with `OK` if connected to the database

## TODO

- **`/heath/ready` should also check the connection to NATS**
- **Refactor how JWT is handled**: currently the JWT is stored in cookies alongside the refresh token. This is not necessary and the JWT should instead be returned to the response body, only the refresh token should be stored in cookies

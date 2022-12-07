# TODO Microservice

This microservice is a Nest.js app that stores the todos and exposes a REST API to manage them. It listens to the following endpoints:

- `/item`:
  - `POST`: create an item
- `/item/:id`:
  - `DELETE`: deletes the todo item with the provided ID
  - `PATCH`: modifies the todo item with the provided ID
- `/list`:
  - `GET`: returns all the lists that belong to the user
  - `POST`: creates a new list
- `/list/:id`:
  - `GET`: returns the list with the provided ID and its items
  - `PATCH`: modifies the list with the provided ID and its items
  - `DELETE`: deletes the list with the provided ID and its items

In addition, it listens for the following NATS `MessagePatter`:

- `todo:userCreated`: creates the initial list when a user is registered

## Commands

- `npm run lint`: lint the source code
- `npm run test`: run unit tests

## Database

Prisma.io is used as ORM. Two tables are created, the first is `lists` which stores the todo lists and associates them with a `userId`, and the other is `items` which stores the todo items and associates them with a list.

## Health

- `/health/live`: always responds with `OK`
- `/health/ready`: responds with `OK` if connected to the database

## TODO

- `/heath/ready` should also check the connection to NATS

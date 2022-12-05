# Full-Stack K8s Showcase Todo App

A side-project I worked on with the intention of learning Kubernetes. The goal was to build a todo app, with user accounts and self-implemented authentication.

## How to Run

### Prerequisites

- Node
- Kubectl
- Minikube (or any other Kubernetes cluster)
- Helm (and bitnami repo: `helm repo add bitnami https://charts.bitnami.com/bitnami`)
- Docker
- Skaffold

### Development

Either `npm run dev:start` or `npm run dev:run`. The difference is that the former will listen for `src/**/*.ts` changes in all microservices and sync the changes with the running containers, the latter will not do that, so you will have to re-run the command for changes to take effect.

The hostname used in development is `todo.dev.local`, to access the site add the following to your hosts file:

```
127.0.0.1 todo.dev.local
```

Port-forwarding is already set up through Skaffold and you should be able to access the site at `todo.dev.local:3000` or `https://todo.dev.local:3443`.

## How it Works?

### Microservices

To learn more about each microservice, check out the READMEs in their respective directories:

- [Auth](auth)
- [Todo](todo)
- [User](user)
- [Web-Client](web-client)

### Databases

The [MySQL helm chart](https://github.com/bitnami/charts/tree/main/bitnami/mysql) from Bitnami is used to release the databases in the cluster. Persistent Volumes are allocated on first run, so the data will not be deleted unless you manually delete it. This is only for cost reduction, in a real world production app you should consider a managed database service instead.

#### Migration & Seeding

[Prisma.io](https://www.prisma.io/) is used on all back-end microservice as an ORM. Migrations and seeding are run using Helm Hooks and Kubernetes Jobs right before an app release is installed/upgraded.

### Communication

Communication between microservices is event-driven through NATS. There are currently two scenarios when this occurs:

- During login/register/logout, `user` will ask `auth` to either retrieve or remove tokens
- When a user is registered, `user` will ask `todo` to create the initial todo list

### Health

Each back-end microservice implements the HTTP endpoints `/health/live` and `/health/ready`, the former is used in `startupProbe` and `livenessProbe`, while the latter in `readinessProbe`.

### Authentication

The authentication is currently self-implemented, it is not recommended to do this in a real-world production app and you should instead consider using an Identity-as-a-Service solution. With that being said, the auth microservice handles generating JWT tokens and stores refresh tokens in its database. JWTs expire in 15 mins, while refresh tokens are rotating, so they can only be used once.

Authentication for all requests is handled through Nginx sub-request feature. When a request is received, Nginx sends a sub-request to another URL (in this case `user` service on `/auth` endpoint), and forwards the headers upstream. If a user is authenticated, the `X-User-ID` and `X-Authenticated` headers will be set. When the microservices receive a request, they check the headers and know whether the user is authenticated or not.

### Environments

The environments are set up in skaffold.yaml and through helm values in `.k8s/values` and `.k8s/secrets`. There are two environments already set up: `dev` and `prod`.

## Skaffold

Skaffold is used to handle the workflow, both in development and in production. Skaffold builds the Docker images (and sync changes in development), pushes them, runs the testing commands in CI, and deploys all the Helm releases.

## Helm

### Releases

- **cert-manager**: used for TLS, in development it generates a self-signed certificate, while in production it fetches signed certificates from Let's Encrypt
- **external-dns**: released only in production and currently set up to automatically update the A record of `todo.alidrizi.com` to the IP address assigned to the Nginx LoadBalancer
- **config**: a local chart in `.k8s/helm-charts/config`. It currently adds:
  - The `reg-credentials` secret so that images can be pulled from the docker registry
  - A ServiceAccount to be used in GitHub Action for CD
  - The Issuer required by cert-manager to generate the certificates
- **nats**: used for services to communicate with each other
- **db-auth**: stores refresh tokens
- **db-user**: stores user account details
- **db-todo**: stores todo lists and items
- **app-auth**
- **app-user**
- **app-todo**
- **app-web-client**

### Values

Values are organized in the following way:

- **base**: values added to helm releases in all environments
- **dev**: values added only in `dev`
- **prod**: values added only in `prod`

Each of the above directories contains the following structure:

- **db**:
  - **base**: values added to all db releases
  - **auth**: values added to db-auth release
  - **user**: values added to db-user release
  - **todo**: values added to db-todo release
- **app**:
  - **base**: values added to all app releases
  - **auth**: values added to app-auth release
  - **user**: values added to app-user release
  - **todo**: values added to app-todo release

### Secrets

Secrets are organized similar to values. This codebase is set up to run the `prod` environment on Linode. To keep secrets, well secret, and in the codebase, [helm-secrets](https://github.com/jkroepke/helm-secrets) is used (which uses [SOPS](https://github.com/mozilla/sops) under the hood) to encrypt the YAML files.

## TODO

- Add monitoring using Prometheus
- Set up logging
- Hash the refresh tokens stored in the database

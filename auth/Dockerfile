FROM node:18.4.0 as base
WORKDIR /app
COPY . .
RUN npm install


# Development
FROM base as dev
ENV NODE_ENV=development
CMD [ "npm", "run", "start:dev" ]


# Production
FROM base as builder
ENV NODE_ENV=production
RUN npm run build

FROM node:18.4.0-alpine3.15 as prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json .
COPY .env .
COPY --from=builder /app/dist dist
RUN npm install --omit=dev
CMD [ "npm", "run", "start:prod" ]

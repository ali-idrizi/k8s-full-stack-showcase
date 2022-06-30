# Development

FROM node:18 as dev

WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY . .
RUN npm install
CMD [ "npm", "run", "start:dev" ]

# Production

FROM node:18 as builder

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:18 as prod

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json .
COPY .env .
COPY --from=builder /usr/src/app/dist dist
RUN npm install --omit=dev
CMD [ "npm", "run", "start:prod" ]

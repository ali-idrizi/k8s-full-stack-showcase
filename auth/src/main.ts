import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const NATS_HOST = process.env.NATS_SERVICE_HOST;
const NATS_PORT = process.env.NATS_SERVICE_PORT;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [`nats://${NATS_HOST}:${NATS_PORT}`],
    },
  });

  await app.listen();
}
bootstrap()

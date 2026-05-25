import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
    }),
  );
  const PORT = process.env.APP_PORT ?? 5000;
  await app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}
start();

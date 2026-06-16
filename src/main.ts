import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      exceptionFactory: (errors) => {
        let message = '';

        errors.forEach((error) => {
          message += `${error.property}: \n`;
          for (const key in error.constraints) {
            message += `${key}: ${error.constraints[key]}\n`;
          }
        });

        return new BadRequestException(message);
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  const PORT = process.env.APP_PORT ?? 5000;
  await app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}
start();

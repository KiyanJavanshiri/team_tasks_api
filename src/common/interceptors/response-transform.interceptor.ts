import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

type TResponse<T> = {
  success: boolean;
  data: T;
};

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<
  T,
  TResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TResponse<T>> | Promise<Observable<TResponse<T>>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
      })),
    );
  }
}

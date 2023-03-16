import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IsCorrectIdLength } from 'src/utils/constants/is-correct-id-length';

@Injectable()
export class IdCheckInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const queryParams = { ...req.params, ...req.query };

    const queryParamsId = Object.keys(queryParams).reduce(
      (accumulator, key) => {
        if (key.includes('Id')) {
          accumulator[key] = queryParams[key];
        }
        return accumulator;
      },
      {},
    );

    for (const [key, value] of Object.entries(queryParamsId)) {
      if (!IsCorrectIdLength(`${value}`)) {
        throw new HttpException(
          `${key} must be longer than or equal to 24 characters`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return next.handle().pipe();
  }
}

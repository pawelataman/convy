import { Observable } from 'rxjs';

export type ApiResponse<T> = Promise<T> | Observable<T>;

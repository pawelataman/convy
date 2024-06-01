import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class BaseApiService {
  protected http: HttpClient = inject(HttpClient);
}

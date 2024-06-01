import { Injectable } from '@angular/core';
import { FileFormat } from '../types/file-formats';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  get availableFormats(): FileFormat[] {
    return ['jpeg', 'png'];
  }
}

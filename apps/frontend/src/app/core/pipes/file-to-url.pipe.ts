import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileToUrl',
  standalone: true,
})
export class FileToUrlPipe implements PipeTransform {
  transform(file: File): string {
    return URL.createObjectURL(file);
  }
}

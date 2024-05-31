import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, Observable, tap, throttleTime } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  public getFilesFromAssets(): Observable<File[]> {
    const jsonUrl = 'assets/images.json';

    return this.http.get<string[]>(jsonUrl).pipe(
      switchMap((fileNames) => from(fileNames)), // Flatten the array of file names
      concatMap((fileName) =>
        this.http.get(`assets/images/${fileName}`, { responseType: 'blob' }).pipe(
          throttleTime(100),
          tap(console.log),
          map((blob) => {
            return new File([blob], fileName, { type: blob.type });
          })
        )
      ),
      toArray() // Collect all File objects into an array
    );
  }
}

import { normalizeFileName } from '@backend/common/utils/file';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import path from 'node:path';
import { Observable } from 'rxjs';

@Injectable()
export class FileWriterService {
  private readonly STORAGE_PATH = './public';

  writeStreamToFile(dataStream: Observable<Uint8Array>, fileName: string, fileExtension: string): Promise<string> {
    this._beforeSave();
    return new Promise((resolve, reject) => {
      const fileUri = path.resolve(this.STORAGE_PATH, normalizeFileName(fileName, fileExtension));
      const writer = fs.createWriteStream(fileUri);

      const streamSubscription = dataStream.subscribe({
        next: (data) => writer.write(data),
        error: (error) => reject(error),
        complete: () => {
          writer.close();
          if (streamSubscription) streamSubscription.unsubscribe();
          resolve(fileUri);
        },
      });
    });
  }

  writeFile(fileName: string, fileExtension: string, saveCallback: (path: string) => Promise<string>): Promise<string> {
    this._beforeSave();
    const fileUri = path.resolve(this.STORAGE_PATH, normalizeFileName(fileName, fileExtension));
    console.log('fileuri', fileUri);
    return saveCallback(fileUri);
  }

  private _beforeSave(): void {
    if (!fs.existsSync(this.STORAGE_PATH)) {
      fs.mkdirSync(this.STORAGE_PATH);
    }
  }
}

import { Injectable } from '@angular/core';
import { FileListItemStore } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.store';
import { ConvertableFile } from '@frontend/src/app/feature/converter/converter.types';
import { ConverterService } from '@frontend/src/app/feature/converter/services/converter.service';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, finalize } from 'rxjs';

@UntilDestroy()
@Injectable()
export class FileListItemService {
  constructor(private readonly _converterService: ConverterService, private readonly _fileListItemStore: FileListItemStore) {}

  convertFile(convertableFile: ConvertableFile, targetFormat: ApiFileType): void {
    this._fileListItemStore.setIsIndeterminate(true);

    this._converterService
      .convertImage(convertableFile.file, targetFormat)
      .pipe(
        untilDestroyed(this),
        catchError((error) => {
          throw error;
        }),
        finalize(() => this._fileListItemStore.setIsIndeterminate(false))
      )
      .subscribe((conversionResult: ApiConversionResponseMetadata) => {
        this._fileListItemStore.setConversionResult(conversionResult);
      });
  }
}

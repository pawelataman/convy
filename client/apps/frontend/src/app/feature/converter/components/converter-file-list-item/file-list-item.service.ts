import { Injectable, signal } from '@angular/core';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { environments } from '@frontend/src/app/environments/environments';
import { ConverterService } from '@frontend/src/app/feature/converter/converter.service';
import { ConversionStatus, ConvertableFile } from '@frontend/src/app/feature/converter/converter.types';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError } from 'rxjs';

@UntilDestroy()
@Injectable()
export class FileListItemService {
  fileListState = signal<FileListItemState>(initialState);

  constructor(private readonly _converterService: ConverterService, private readonly _configService: ConfigService) {}

  convertFile(convertableFile: ConvertableFile, targetFormat: ApiFileType): void {
    this.setStatus(ConversionStatus.CONVERTING);

    this._converterService
      .convertImage(convertableFile.file, targetFormat)
      .pipe(
        untilDestroyed(this),
        catchError((error) => {
          this.setStatus(ConversionStatus.ERROR);
          throw error;
        })
      )
      .subscribe((conversionResult: ApiConversionResponseMetadata) => {
        this.setConversionResult(conversionResult);
        this.setStatus(ConversionStatus.FINISHED);
      });
  }

  setStatus(status: ConversionStatus) {
    this.fileListState.update((state) => ({ ...state, status }));
  }

  setConversionResult(conversionResult: ApiConversionResponseMetadata) {
    this.fileListState.update((state) => ({ ...state, conversionResult }));
  }

  getDownloadLink(conversionId?: string): string {
    return `${environments.API_URL}/converter/conversion/${conversionId}`;
  }

  getActionLabel(status: ConversionStatus): string {
    switch (status) {
      case ConversionStatus.READY_TO_CONVERT:
        return 'Convert';
      case ConversionStatus.FINISHED:
        return 'Download';
      case ConversionStatus.ERROR:
        return 'Error';
      case ConversionStatus.CONVERTING:
        return 'Converting';
    }
  }
}

interface FileListItemState {
  status: ConversionStatus;
  conversionResult: ApiConversionResponseMetadata | null;
  convertableFile: ConvertableFile | null;
}

const initialState: FileListItemState = {
  status: ConversionStatus.READY_TO_CONVERT,
  conversionResult: null,
  convertableFile: null,
};

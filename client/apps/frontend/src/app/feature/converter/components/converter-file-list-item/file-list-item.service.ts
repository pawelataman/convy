import { Injectable, signal } from '@angular/core';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { environments } from '@frontend/src/app/environments/environments';
import { ConverterService } from '@frontend/src/app/feature/converter/converter.service';
import { ConvertableFile } from '@frontend/src/app/feature/converter/converter.types';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, finalize } from 'rxjs';

@UntilDestroy()
@Injectable()
export class FileListItemService {
  fileListItemState = signal<FileListItemState>({
    loading: false,
    conversionResult: {},
    convertableFile: null,
    currentTargetFormat: this._configService.supportedFileTypes[0],
    currentLink: '',
  });

  constructor(private readonly _converterService: ConverterService, private readonly _configService: ConfigService) {
    this._updateCurrentLink();
  }

  convertFile(convertableFile: ConvertableFile): void {
    this.setLoading(true);

    const targetFormat = this.fileListItemState().currentTargetFormat;
    this._converterService
      .convertImage(convertableFile.file, targetFormat)
      .pipe(
        untilDestroyed(this),
        catchError((error) => {
          throw error;
        }),
        finalize(() => this.setLoading(false))
      )
      .subscribe((conversionResult: ApiConversionResponseMetadata) => {
        this.setConversionResult(conversionResult, targetFormat);
      });
  }

  setLoading(loading: boolean) {
    this.fileListItemState.update((state) => ({ ...state, loading }));
  }

  setConversionResult(conversionResult: ApiConversionResponseMetadata, targetFormat: ApiFileType): void {
    this.fileListItemState.update((state) => ({
      ...state,
      conversionResult: {
        ...state.conversionResult,
        [targetFormat.id]: conversionResult,
      },
    }));

    this._updateCurrentLink();
  }

  setTargetFormat(targetFormat: ApiFileType) {
    this.fileListItemState.update((state) => ({
      ...state,
      currentTargetFormat: targetFormat,
    }));

    console.log('new target format', targetFormat);

    this._updateCurrentLink();
  }

  private _updateCurrentLink() {
    const currentTarget = this.fileListItemState().currentTargetFormat;
    const conversionResult = this.fileListItemState().conversionResult;

    const currentLink =
      currentTarget && conversionResult[currentTarget.id]
        ? `${environments.API_URL}/converter/conversion/${conversionResult[currentTarget.id].conversionId}`
        : '';

    this.fileListItemState.update((state) => ({
      ...state,
      currentLink,
    }));
  }
}

interface FileListItemState {
  loading: boolean;
  conversionResult: { [targetId: number]: ApiConversionResponseMetadata };
  convertableFile: ConvertableFile | null;
  currentTargetFormat: ApiFileType;
  currentLink: string;
}

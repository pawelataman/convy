import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { catchError, of } from 'rxjs';

import { FileSizePipe } from '@frontend/src/app/core/pipes/file-size.pipe';
import { FileToUrlPipe } from '@frontend/src/app/core/pipes/file-to-url.pipe';
import { ConverterService } from '../../converter.service';
import { ConversionStatus, ConvertableFile, ViewType } from '../../converter.types';
import { ConverterActionComponent } from '../converter-file-list-item-action/converter-file-list-item-action.component';
import { ConverterSelectTargetComponent } from '../converter-select-target/converter-select-target.component';

@Component({
  selector: 'app-converter-file-list-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe, ConverterSelectTargetComponent, FileSizePipe, ConverterActionComponent],
  templateUrl: './converter-file-list-item.component.html',
})
export class ConverterFileListItemComponent {
  viewType = input<ViewType>('list');
  file = input.required<ConvertableFile>();
  removeItem = output<string>();
  targetFormat = signal<ApiFileType>(this._configService.supportedFileTypes[0]);
  private _status = signal<ConversionStatus>(ConversionStatus.READY_TO_CONVERT);
  vm = computed(() => ({
    isActionDisabled: this._status() !== ConversionStatus.READY_TO_CONVERT,
    isFinished: this._status() === ConversionStatus.FINISHED,
    viewType: this.viewType(),
    status: this._status(),
    file: this.file(),
  }));
  private _conversionResult = signal<ApiConversionResponseMetadata | null>(null);

  constructor(private readonly _converterService: ConverterService, private readonly _configService: ConfigService) {
    effect(() => {
      console.log(this.targetFormat());
    });
  }

  sendFileConvert(): void {
    this._status.set(ConversionStatus.CONVERTING);

    this._converterService
      .convertImage(this.file().file, this.targetFormat())
      .pipe(
        catchError((error) => {
          this._status.set(ConversionStatus.ERROR);
          return of(error);
        })
      )
      .subscribe((conversionResult: ApiConversionResponseMetadata) => {
        this._conversionResult.set(conversionResult);
        this._status.set(ConversionStatus.FINISHED);
      });
  }

  downloadFile() {
    if (this._conversionResult()) {
      this._converterService.downloadImage(this._conversionResult()!.conversionId);
    }
  }

  fileConversionError() {
    console.error('Error');
  }
}

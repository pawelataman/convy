import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { FileSizePipe } from '../../../../core/pipes/file-size.pipe';
import { FileToUrlPipe } from '../../../../core/pipes/file-to-url.pipe';
import { ConverterService } from '../../converter.service';
import { ConversionResult, ConversionStatus, ConvertableFile, ViewType } from '../../converter.types';
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
  targetFormat = model('png');
  private _status = signal<ConversionStatus>(ConversionStatus.READY_TO_CONVERT);
  vm = computed(() => ({
    isActionDisabled: this._status() !== ConversionStatus.READY_TO_CONVERT,
    isFinished: this._status() === ConversionStatus.FINISHED,
    viewType: this.viewType(),
    status: this._status(),
    file: this.file(),
  }));
  private _conversionResult = signal<ConversionResult | null>(null);

  constructor(private readonly _converterService: ConverterService) {}

  sendFileConvert(): void {
    this._status.set(ConversionStatus.CONVERTING);

    this._converterService
      .convertImage(this.file().file)
      .pipe(
        catchError((error) => {
          this._status.set(ConversionStatus.ERROR);
          return of(error);
        })
      )
      .subscribe((conversionResult: ConversionResult) => {
        this._conversionResult.set(conversionResult);
        this._status.set(ConversionStatus.FINISHED);
      });
  }

  fileConversionError(): void {}
}

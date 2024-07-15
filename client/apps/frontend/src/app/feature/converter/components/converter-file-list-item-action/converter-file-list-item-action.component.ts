import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { ConversionStatus } from '../../converter.types';

@Component({
  selector: 'app-converter-file-list-item-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './converter-file-list-item-action.component.html',
})
export class ConverterActionComponent {
  status = input.required<ConversionStatus>();
  convert = output();
  download = output();
  error = output();

  canConvertAgain = computed(() => {
    return [ConversionStatus.READY_TO_CONVERT, ConversionStatus.FINISHED].includes(this.status());
  });

  label = computed(() => {
    switch (this.status()) {
      case ConversionStatus.READY_TO_CONVERT:
        return 'Convert';
      case ConversionStatus.FINISHED:
        return 'Download';
      case ConversionStatus.ERROR:
        return 'Error';
      case ConversionStatus.CONVERTING:
        return 'Converting';
    }
  });
  protected readonly ConversionStatus = ConversionStatus;

  actionClick(): void {
    switch (this.status()) {
      case ConversionStatus.READY_TO_CONVERT:
        this.convert.emit();
        break;
      case ConversionStatus.FINISHED:
        this.download.emit();
        break;
      case ConversionStatus.ERROR:
        break;
      case ConversionStatus.CONVERTING:
        break;
    }
  }
}

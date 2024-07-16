import { CommonModule } from '@angular/common';
import { Component, computed, output } from '@angular/core';
import { FileListItemService } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.service';
import { ConversionStatus } from '../../converter.types';

@Component({
  selector: 'app-converter-file-list-item-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './converter-file-list-item-action.component.html',
})
export class ConverterActionComponent {
  vm = computed(() => ({
    canConvertAgain: [ConversionStatus.READY_TO_CONVERT, ConversionStatus.FINISHED].includes(this._fileListItemService.fileListState().status),
    actionLabel: this._fileListItemService.getActionLabel(this._fileListItemService.fileListState().status),
    status: this._fileListItemService.fileListState().status,
    downloadLink: this._fileListItemService.getDownloadLink(this._fileListItemService.fileListState().conversionResult?.conversionId),
  }));
  convert = output();
  protected readonly ConversionStatus = ConversionStatus;

  constructor(private readonly _fileListItemService: FileListItemService) {}
}

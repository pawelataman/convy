import { CommonModule } from '@angular/common';
import { Component, computed, output } from '@angular/core';
import { FileListItemService } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.service';

@Component({
  selector: 'app-converter-file-list-item-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './converter-file-list-item-action.component.html',
})
export class ConverterActionComponent {
  convert = output();
  vm = computed(() => ({
    isLoading: this._fileListItemService.fileListItemState().loading,
    downloadLink: this._fileListItemService.fileListItemState().currentLink,
  }));

  constructor(private readonly _fileListItemService: FileListItemService) {}
}

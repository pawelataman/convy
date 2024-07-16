import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FileSizePipe } from '@frontend/src/app/core/pipes/file-size.pipe';
import { FileToUrlPipe } from '@frontend/src/app/core/pipes/file-to-url.pipe';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { FileListItemService } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.service';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { ConvertableFile, ViewType } from '../../converter.types';
import { ConverterActionComponent } from '../converter-file-list-item-action/converter-file-list-item-action.component';
import { ConverterSelectTargetComponent } from '../converter-select-target/converter-select-target.component';

@Component({
  selector: 'app-converter-file-list-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe, ConverterSelectTargetComponent, FileSizePipe, ConverterActionComponent],
  templateUrl: './converter-file-list-item.component.html',
  providers: [FileListItemService],
})
export class ConverterFileListItemComponent {
  viewType = input<ViewType>('list');
  file = input.required<ConvertableFile>();
  removeItem = output<string>();
  vm = computed(() => ({
    viewType: this.viewType(),
    file: this.file(),
    currentTargetFormat: this._fileListItemService.fileListItemState().currentTargetFormat,
  }));

  constructor(private readonly _fileListItemService: FileListItemService, private readonly _configService: ConfigService) {}

  convertFile() {
    this._fileListItemService.convertFile(this.file());
  }

  targetFormatChange(targetFormat: ApiFileType | null | undefined) {
    if (targetFormat) {
      this._fileListItemService.setTargetFormat(targetFormat);
    }
  }
}

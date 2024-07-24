import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, output } from '@angular/core';
import { FileSizePipe } from '@frontend/src/app/core/pipes/file-size.pipe';
import { FileToUrlPipe } from '@frontend/src/app/core/pipes/file-to-url.pipe';
import { FileListItemService } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.service';
import { FileListItemStore } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.store';
import { ConverterService } from '@frontend/src/app/feature/converter/converter.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConvertableFile } from '../../converter.types';
import { ConverterActionComponent } from '../converter-file-list-item-action/converter-file-list-item-action.component';
import { ConverterSelectTargetComponent } from '../converter-select-target/converter-select-target.component';

@UntilDestroy()
@Component({
  selector: 'app-converter-file-list-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe, ConverterSelectTargetComponent, FileSizePipe, ConverterActionComponent],
  templateUrl: './converter-file-list-item.component.html',
  providers: [FileListItemService, FileListItemStore],
})
export class ConverterFileListItemComponent implements OnInit {
  file = input.required<ConvertableFile>();
  removeItem = output<string>();
  vm = computed(() => ({
    file: this.file(),
  }));

  constructor(private readonly _fileListItemService: FileListItemService, private readonly _converterService: ConverterService) {}

  ngOnInit(): void {
    this._converterService.events$.convertEvent.pipe(untilDestroyed(this)).subscribe((targetFormat) => {
      this._fileListItemService.convertFile(this.file(), targetFormat);
    });
  }
}

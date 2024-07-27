import { CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, input, OnInit, output, viewChild } from '@angular/core';
import { FileSizePipe } from '@frontend/src/app/core/pipes/file-size.pipe';
import { FileToUrlPipe } from '@frontend/src/app/core/pipes/file-to-url.pipe';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { FileListItemService } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.service';
import { FileListItemStore } from '@frontend/src/app/feature/converter/components/converter-file-list-item/file-list-item.store';
import { ConverterSelectTargetSearchComponent } from '@frontend/src/app/feature/converter/components/converter-select-target-search/converter-select-target-search.component';
import { ConverterStore } from '@frontend/src/app/feature/converter/converter.store';
import { ConverterService } from '@frontend/src/app/feature/converter/services/converter.service';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConvertableFile } from '../../converter.types';
import { ConverterSelectTargetComponent } from '../converter-select-target/converter-select-target.component';

@UntilDestroy()
@Component({
  selector: 'app-converter-file-list-item',
  standalone: true,
  imports: [
    CommonModule,
    FileToUrlPipe,
    ConverterSelectTargetComponent,
    FileSizePipe,
    ConverterSelectTargetSearchComponent,
    CdkMenuTrigger,
    NgOptimizedImage,
  ],
  templateUrl: './converter-file-list-item.component.html',
  providers: [FileListItemService, FileListItemStore],
})
export class ConverterFileListItemComponent implements OnInit {
  menuTrigger = viewChild<CdkMenuTrigger>(CdkMenuTrigger);
  file = input.required<ConvertableFile>();
  vm = computed(() => ({
    file: this.file(),
    targetFormat: this._fileListItemStore.targetFormat(),
    allowedFormats: this._configService.supportedFileTypes,
    isIndeterminate: this._fileListItemStore.isIndeterminate(),
    result: computed(() => {
      if (this._fileListItemStore.targetFormat()) {
        return this._fileListItemStore.conversionResult()[this._fileListItemStore.targetFormat()!.id];
      }
      return null;
    })(),
  }));
  removeItem = output<string>();

  constructor(
    private readonly _fileListItemService: FileListItemService,
    private readonly _converterService: ConverterService,
    private readonly _converterStore: ConverterStore,
    private readonly _fileListItemStore: FileListItemStore,
    private readonly _configService: ConfigService
  ) {}

  ngOnInit(): void {
    this._converterService.events$.convertEvent.pipe(untilDestroyed(this)).subscribe(() => {
      if (this._fileListItemStore.targetFormat()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._fileListItemService.convertFile(this.file(), this._fileListItemStore.targetFormat()!);
      }
    });
  }

  setTarget(target: ApiFileType) {
    this.menuTrigger()?.close();
    this._fileListItemStore.setTargetFormat(target);
    this._converterStore.setTargetFormat(null);
  }

  download(conversionMetadata: ApiConversionResponseMetadata) {
    this._fileListItemService.downloadFile(conversionMetadata);
  }
}

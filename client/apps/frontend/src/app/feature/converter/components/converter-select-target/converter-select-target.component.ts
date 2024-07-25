import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { ConverterStore } from '@frontend/src/app/feature/converter/converter.store';
import { ApiFileType } from '@libs/api/types/api-file-type';

@Component({
  selector: 'app-converter-select-target',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkMenuTrigger, CdkMenuItem, CdkMenu],
  templateUrl: './converter-select-target.component.html',
})
export class ConverterSelectTargetComponent {
  vm = computed(() => ({
    allowedFormats: this._configService.supportedFileTypes,
    currentTarget: this._converterStore.targetFormat(),
    totalFilesCount: this._converterStore.files().length,
  }));

  constructor(private readonly _configService: ConfigService, private readonly _converterStore: ConverterStore) {}

  setTarget(format: ApiFileType): void {
    this._converterStore.setTargetFormat(format);
  }
}

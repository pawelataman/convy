import { CommonModule } from '@angular/common';
import { Component, computed, Input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { ConverterStore } from '@frontend/src/app/feature/converter/converter.store';
import { ApiFileType } from '@libs/api/types/api-file-type';

@Component({
  selector: 'app-converter-select-target',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter-select-target.component.html',
})
export class ConverterSelectTargetComponent {
  @Input() placeholder = 'Convert to';
  @Input() disabled = false;

  formatOptions = signal(this._configService.supportedFileTypes);
  targetFormat = model<ApiFileType | null>();

  vm = computed(() => ({
    targetFormat: this._converterStore.targetFormat(),
  }));

  constructor(private readonly _configService: ConfigService, private readonly _converterStore: ConverterStore) {}

  targetFormatChange(format: ApiFileType): void {
    this._converterStore.setTargetFormat(format);
  }
}

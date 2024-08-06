import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { extractFileFormat } from '@frontend/src/app/core/utils/file';
import { ConverterSelectTargetComponent } from '@frontend/src/app/feature/converter/components/converter-select-target/converter-select-target.component';
import { ConverterStore } from '@frontend/src/app/feature/converter/converter.store';
import { ConverterApiService } from '@frontend/src/app/feature/converter/services/converter-api.service';
import { generateUuid } from '@libs/utils/guid';
import { ConverterFileListComponent } from './components/converter-file-list/converter-file-list.component';
import { ConvertableFile } from './converter.types';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  providers: [ConverterService, ConverterApiService, ConverterStore],
  imports: [CommonModule, FormsModule, ConverterFileListComponent, ConverterSelectTargetComponent],
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit {
  acceptedFormats = signal<string>('');
  vm = computed(() => ({
    convertableFiles: this._converterStore.files(),
    targetFormat: this._converterStore.targetFormat(),
  }));

  constructor(private readonly _configService: ConfigService, private readonly _converterStore: ConverterStore) {}

  onFileChange($event: Event): void {
    const input: HTMLInputElement = $event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files) {
      this._converterStore.setConverterFiles(Array.from(files).map(this._createNewConvertableFile.bind(this)));
    }
  }

  onRemoveItem(id: string): void {
    this._converterStore.deleteFileById(id);
  }

  ngOnInit(): void {
    this._constructAcceptedFormatString();
  }

  private _constructAcceptedFormatString(): void {
    const supportedFileTypes = this._configService.supportedFileTypes;

    const acceptedFormatsStr = supportedFileTypes.map((supportedFileType) => `.${supportedFileType.name}`).join(',');
    this.acceptedFormats.set(acceptedFormatsStr);
  }

  private _createNewConvertableFile(file: File): ConvertableFile {
    return {
      file,
      id: generateUuid(),
      format: extractFileFormat(file),
    };
  }
}

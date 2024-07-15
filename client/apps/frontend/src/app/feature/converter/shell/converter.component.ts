import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { FileService } from '../../../core/services/file.service';
import { PlatformService } from '../../../core/services/platform.service';
import { extractFileFormat } from '../../../core/utils/file';
import { generateUUid } from '../../../core/utils/uuid';
import { ConverterFileListComponent } from '../components/converter-file-list/converter-file-list.component';
import { ConverterApiService } from '../converter-api.service';
import { ConverterService } from '../converter.service';
import { ConvertableFile } from '../converter.types';

@Component({
  selector: 'app-converter',
  standalone: true,
  providers: [ConverterService, ConverterApiService],
  imports: [CommonModule, FormsModule, ConverterFileListComponent],
  templateUrl: './converter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterComponent implements OnInit {
  convertableFiles = signal<ConvertableFile[]>([]);
  acceptedFormats = signal<string>('');

  constructor(
    private readonly _configService: ConfigService,
    private readonly _fileService: FileService,
    private readonly _platformService: PlatformService,
    private readonly _converterService: ConverterService
  ) {
    //  effect(() => console.log(this.convertableFiles()));
  }

  onFileChange($event: Event): void {
    const input: HTMLInputElement = $event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files) {
      this.convertableFiles.set([...this.convertableFiles(), ...Array.from(files).map(this._createNewConvertableFile.bind(this))]);
    }
  }

  onRemoveItem(id: string): void {
    const afterRemoved = this.convertableFiles().filter((file) => file.id !== id);
    this.convertableFiles.set(afterRemoved);
  }

  ngOnInit(): void {
    this._constructAcceptedFormatString();
    // this._fetchImagesFromAssets();
  }

  private _constructAcceptedFormatString(): void {
    const supportedFileTypes = this._configService.supportedFileTypes;

    const acceptedFormatsStr = supportedFileTypes.map((supportedFileType) => `image/${supportedFileType.name}`).join(',');
    this.acceptedFormats.set(acceptedFormatsStr);
  }

  private _fetchImagesFromAssets(): void {
    if (this._platformService.isServer()) {
      return;
    }
    this._fileService
      .getFilesFromAssets()
      .pipe(take(1))
      .subscribe((files: File[]) => {
        this.convertableFiles.set(files.map((file) => this._createNewConvertableFile(file)));
      });
  }

  private _createNewConvertableFile(file: File): ConvertableFile {
    return {
      file,
      id: generateUUid(),
      format: extractFileFormat(file),
    };
  }
}

import { Injectable } from '@angular/core';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { ConvertableFile } from '@frontend/src/app/feature/converter/converter.types';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { patchState, signalState } from '@ngrx/signals';

type ConverterState = {
  targetFormat: ApiFileType;
  files: ConvertableFile[];
};

@Injectable({ providedIn: 'root' })
export class ConverterStore {
  private readonly _initial: ConverterState = {
    targetFormat: this._configService.supportedFileTypes[0],
    files: [],
  };
  private readonly _state = signalState<ConverterState>(this._initial);

  readonly targetFormat = this._state.targetFormat;
  readonly files = this._state.files;

  constructor(private readonly _configService: ConfigService) {}

  setTargetFormat(format: ApiFileType): void {
    patchState(this._state, (state) => ({ ...state, targetFormat: format }));
  }

  setConverterFiles(files: ConvertableFile[]): void {
    patchState(this._state, (state) => ({ ...state, files }));
  }

  deleteFileById(id: string): void {
    patchState(this._state, (state) => ({ ...state, files: state.files.filter((file) => file.id !== id) }));
  }
}

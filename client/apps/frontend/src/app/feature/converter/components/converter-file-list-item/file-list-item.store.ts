import { Injectable } from '@angular/core';
import { ConvertableFile } from '@frontend/src/app/feature/converter/converter.types';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { patchState, signalState } from '@ngrx/signals';

type FileListItemState = {
  isIndeterminate: boolean;
  conversionResult: { [targetId: number]: ApiConversionResponseMetadata };
  convertableFile: ConvertableFile | null;
  currentLink: string;
};

@Injectable()
export class FileListItemStore {
  private readonly _initial: FileListItemState = {
    isIndeterminate: false,
    conversionResult: {},
    convertableFile: null,
    currentLink: '',
  };

  private readonly _state = signalState<FileListItemState>(this._initial);

  readonly isIndeterminate = this._state.isIndeterminate;
  readonly conversionResult = this._state.conversionResult;
  readonly convertableFile = this._state.convertableFile;

  setIsIndeterminate(isIndeterminate: boolean) {
    patchState(this._state, (state) => ({ ...state, isIndeterminate }));
  }

  setConversionResult(result: ApiConversionResponseMetadata) {}
}

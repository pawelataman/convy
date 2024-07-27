import { effect, Injectable } from '@angular/core';
import { ConverterStore } from '@frontend/src/app/feature/converter/converter.store';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { patchState, signalState } from '@ngrx/signals';

type FileListItemState = {
  isIndeterminate: boolean;
  conversionResult: { [id: string]: ApiConversionResponseMetadata };
  currentLink: string;
  targetFormat: ApiFileType | null;
};

@Injectable()
export class FileListItemStore {
  private readonly _initial: FileListItemState = {
    isIndeterminate: false,
    conversionResult: {},
    currentLink: '',
    targetFormat: this._converterStore.targetFormat(),
  };

  private readonly _state = signalState<FileListItemState>(this._initial);

  readonly isIndeterminate = this._state.isIndeterminate;
  readonly conversionResult = this._state.conversionResult;
  readonly targetFormat = this._state.targetFormat;

  constructor(private readonly _converterStore: ConverterStore) {
    effect(() => this._onGlobalTargetChange(), { allowSignalWrites: true });
  }

  setIsIndeterminate(isIndeterminate: boolean) {
    patchState(this._state, (state) => ({ ...state, isIndeterminate }));
  }

  setConversionResult(result: ApiConversionResponseMetadata, targetFormat: ApiFileType): void {
    patchState(this._state, (state) => ({
      ...state,
      conversionResult: { ...state.conversionResult, [targetFormat.id]: result },
    }));
  }

  setTargetFormat(format: ApiFileType) {
    patchState(this._state, (state) => ({ ...state, targetFormat: format }));
  }

  private _onGlobalTargetChange() {
    if (this._converterStore.targetFormat()) {
      this.setTargetFormat(this._converterStore.targetFormat()!);
    }
  }
}

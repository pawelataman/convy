export interface ConvertableFile {
  id: string;
  file: File;
  format: string;
  targetFormat?: string;
}

export enum ConversionStatus {
  READY_TO_CONVERT = 'ready_to_convert',
  CONVERTING = 'converting',
  FINISHED = 'finished',
  ERROR = 'error',
}

export type ViewType = 'grid' | 'list';

export interface ConversionRequestMetadata {
  requestId: string;
  sourceFormat: string;
  targetFormat: string;
  fileName: string;
}

export interface ConversionResult {
  requestId: string;
  fileName: string;
  url: string;
}

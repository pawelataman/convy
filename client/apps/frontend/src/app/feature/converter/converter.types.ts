export interface ConvertableFile {
  id: string;
  file: File;
  format: string;
  targetFormat?: string;
}

export type FileListItemActionType = 'download' | 'convert';

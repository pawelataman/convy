export interface ConvertableFile {
  id: string;
  file: File;
  format: string;
  targetFormat?: string;
}

export type ViewType = 'grid' | 'list';

export type FileListItemActionType = 'download' | 'convert';

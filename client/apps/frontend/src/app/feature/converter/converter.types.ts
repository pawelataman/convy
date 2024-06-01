import { FileFormat } from '../../core/types/file-formats';

export interface ConvertableFile {
  id: string;
  file: File;
  format: FileFormat;
  targetFormat?: FileFormat;
}

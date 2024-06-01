import { FileFormat } from '../types/file-formats';

export function extractFileFormat(file: File): FileFormat {
  return file.type.split('/')[1] as FileFormat;
}

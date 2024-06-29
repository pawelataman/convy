import { ConvertableFile } from '../types/convertable-file.type';

export interface IConverter {
  convert(file: ConvertableFile): void;
}

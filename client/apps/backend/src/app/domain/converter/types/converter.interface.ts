import { ConvertableFile } from './convertable-file.type';

export interface IConverter {
  convert(file: ConvertableFile): void;
}

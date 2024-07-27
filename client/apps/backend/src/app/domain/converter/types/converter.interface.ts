export interface IConverter {
  convert(buffer: Buffer, targetFormatName: string): void;
}

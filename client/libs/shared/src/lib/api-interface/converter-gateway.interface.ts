export interface IConverterGatewayInterface {
  convertImage<T>(file: T, metadata: { fileName: string; sourceFormat: string; targetFormat: string }): void;
}

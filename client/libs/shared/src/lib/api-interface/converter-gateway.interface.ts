export interface IConverterGatewayInterface {
  convertImage(file: File, metadata: { sourceFormat: string; targetFormat: string }): void;
}

import { FileTypeDTO, GetSettingsResponse } from './api-response.interface';

export interface IConverterGatewayInterface {
  getSettings(): Promise<GetSettingsResponse>;

  getFormatsForFileType(fileTypeId: number): Promise<FileTypeDTO[]>;
}

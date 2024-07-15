export interface GetSettingsResponse {
  supportedFileTypes: FileTypeDTO[];
}

export interface FileTypeDTO {
  id: number;
  name: string;
}

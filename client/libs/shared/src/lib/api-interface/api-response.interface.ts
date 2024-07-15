export interface GetSettingsResponse {
  supportedFileTypes: FileType[];
}

export interface FileType {
  id: number;
  name: string;
}

export interface ConversionRequestMetadata {
  requestId: string;
  sourceFormat: string;
  targetFormat: string;
  fileName: string;
}

export interface ConversionResponseMetadata {
  requestId: string;
  fileName: string;
  url: string;
}

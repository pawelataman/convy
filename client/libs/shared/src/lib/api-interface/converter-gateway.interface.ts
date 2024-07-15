import { Observable } from 'rxjs';
import { ConversionRequestMetadata, ConversionResponseMetadata, FileType, GetSettingsResponse } from './api-response.interface';

export interface IConverterGatewayInterface {
  getSettings(): Observable<GetSettingsResponse>;

  getFormatsForFileType(fileTypeId: number): Observable<FileType[]>;

  convert(file: Blob, metadata: ConversionRequestMetadata): Observable<ConversionResponseMetadata>;
}

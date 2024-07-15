import { Observable } from 'rxjs';
import { ConversionRequestMetadata } from './types/conversion-request-metadata';
import { ConversionResponseMetadata } from './types/conversion-response-metadata';
import { FileType } from './types/file-type';
import { GetSettingsResponse } from './types/get-settings-response';

export interface IConverterGatewayInterface {
  getSettings(): Observable<GetSettingsResponse>;

  getFormatsForFileType(fileTypeId: number): Observable<FileType[]>;

  convert(file: Blob, metadata: ConversionRequestMetadata): Observable<ConversionResponseMetadata>;
}

import { Observable } from 'rxjs';
import { ApiConversionRequestMetadata } from './types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from './types/api-conversion-response-metadata';
import { ApiFileType } from './types/api-file-type';
import { ApiGetSettingsResponse } from './types/api-get-settings-response';

export interface IConverterGatewayInterface {
  getSettings(): Observable<ApiGetSettingsResponse>;

  getFormatsForFileType(fileTypeId: number): Observable<ApiFileType[]>;

  convert(file: Blob, metadata: ApiConversionRequestMetadata): Observable<ApiConversionResponseMetadata>;
}

import { ApiResponse } from '../utils/api';
import { ApiConversionRequestMetadata } from './types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from './types/api-conversion-response-metadata';

export interface IConverterGateway {
  convert(file: any, metadata: ApiConversionRequestMetadata): ApiResponse<ApiConversionResponseMetadata>;

  getConvertedImage(conversionId: string): ApiResponse<any>;
}

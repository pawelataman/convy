import { ApiResponse } from '../utils/api';
import { ApiFileType } from './types/api-file-type';
import { ApiGetSettingsResponse } from './types/api-get-settings-response';

export interface ISettingsGateway {
  getSettings(): ApiResponse<ApiGetSettingsResponse>;

  getFormatsForFileType(fileTypeId: number): ApiResponse<ApiFileType[]>;
}

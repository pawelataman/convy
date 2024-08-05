import { ApiFileType } from './api-file-type';

export class ApiGetSettingsResponse {
  supportedFileTypes: ApiFileType[];
  fileTypesConvertableTo: { [id: number]: ApiFileType[] };
}

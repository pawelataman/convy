import { ApiFileType } from '@libs/api/types/api-file-type';

export interface AppConfig {
  supportedFileTypes: ApiFileType[];
  fileTypesConvertableTo: { [id: number]: ApiFileType[] };
}

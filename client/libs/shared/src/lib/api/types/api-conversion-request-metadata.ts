import { IsNotEmpty } from 'class-validator';

export class ApiConversionRequestMetadata {
  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  targetFormatId: number;
}

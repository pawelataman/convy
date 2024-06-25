import { IsNotEmpty } from 'class-validator';

export class ConversionRequestMetadata {
  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  sourceFormat: string;

  @IsNotEmpty()
  targetFormat: string;

  @IsNotEmpty()
  fileName: string;
}

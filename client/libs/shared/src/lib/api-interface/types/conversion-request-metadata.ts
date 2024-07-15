import { IsNotEmpty } from 'class-validator';

export class ConversionRequestMetadata {
  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  targetFormatId: number;
}

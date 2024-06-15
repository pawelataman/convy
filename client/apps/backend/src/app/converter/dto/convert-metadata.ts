import { IsNotEmpty } from 'class-validator';

export class ConversionRequestMetadata {
  @IsNotEmpty({ message: 'Dupa' })
  sourceFormat: string;

  @IsNotEmpty()
  targetFormat: string;

  @IsNotEmpty()
  fileName: string;
}

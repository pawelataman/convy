import { IsNotEmpty } from 'class-validator';

export class ConvertMetadata {
  @IsNotEmpty({ message: 'Dupa' })
  sourceFormat: string;

  @IsNotEmpty()
  targetFormat: string;
}

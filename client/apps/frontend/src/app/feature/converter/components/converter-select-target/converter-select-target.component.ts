import { CommonModule } from '@angular/common';
import { Component, Input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '@frontend/src/app/core/services/config.service';
import { FileType } from '@libs/api-interface/types/file-type';

@Component({
  selector: 'app-converter-select-target',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter-select-target.component.html',
  styles: ``,
})
export class ConverterSelectTargetComponent {
  @Input() placeholder = 'Convert to';
  @Input() disabled = false;
  formatOptions = signal(this._configService.supportedFileTypes);
  targetFormat = model<FileType | null>();

  constructor(private readonly _configService: ConfigService) {}
}

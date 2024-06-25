import { CommonModule } from '@angular/common';
import { Component, inject, Input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';

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

  targetFormat = model(null);
  private _configService = inject(ConfigService);
  formatOptions = signal(this._configService.supportedTargetFileFormats);
}

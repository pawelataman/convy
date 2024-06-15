import { CommonModule } from '@angular/common';
import { Component, inject, Input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-convert-to-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './convert-to-select.component.html',
  styles: ``,
})
export class ConvertToSelectComponent {
  @Input() placeholder = 'Convert to';

  targetFormat = model(null);
  private _configService = inject(ConfigService);
  formatOptions = signal(this._configService.supportedTargetFileFormats);
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ConvertableFile } from '../../converter.types';
import { ConverterFileListItemComponent } from '../converter-file-list-item/converter-file-list-item.component';
import { ConverterSelectTargetComponent } from '../converter-select-target/converter-select-target.component';

@Component({
  selector: 'app-converter-file-list',
  standalone: true,
  imports: [CommonModule, ConverterFileListItemComponent, ConverterSelectTargetComponent],
  templateUrl: './converter-file-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterFileListComponent {
  files = input<ConvertableFile[]>([]);
  removeItem = output<string>();
}

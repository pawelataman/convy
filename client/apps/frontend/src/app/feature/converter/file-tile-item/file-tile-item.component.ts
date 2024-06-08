import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FileToUrlPipe } from '../../../core/pipes/file-to-url.pipe';
import { ConvertableFile } from '../converter.types';

@Component({
  selector: 'app-file-tile-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe],
  templateUrl: './file-tile-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTileItemComponent {
  file = input.required<ConvertableFile>();
  removeItem = output<string>();
}

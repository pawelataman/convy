import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FileToUrlPipe } from '../../../core/pipes/file-to-url.pipe';
import { ConvertableFile } from '../converter.types';

@Component({
  selector: 'app-file-list-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe],
  templateUrl: './file-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListItemComponent {
  file = input.required<ConvertableFile>();
  removeItem = output<string>();
}

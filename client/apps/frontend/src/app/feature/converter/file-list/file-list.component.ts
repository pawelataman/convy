import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ConvertableFile } from '../converter.types';
import { FileListItemComponent } from '../file-list-item/file-list-item.component';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule, FileListItemComponent],
  templateUrl: './file-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  files = input<ConvertableFile[]>([]);
  viewType = signal<'grid' | 'list'>('list');

  removeItem = output<string>();
}

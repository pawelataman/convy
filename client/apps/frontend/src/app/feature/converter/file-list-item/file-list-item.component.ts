import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FileSizePipe } from '../../../core/pipes/file-size.pipe';
import { FileToUrlPipe } from '../../../core/pipes/file-to-url.pipe';
import { ConvertToSelectComponent } from '../convert-to-select/convert-to-select.component';
import { ConverterService } from '../converter.service';
import { ConvertableFile } from '../converter.types';

@Component({
  selector: 'app-file-list-item',
  standalone: true,
  imports: [CommonModule, FileToUrlPipe, ConvertToSelectComponent, FileSizePipe],
  templateUrl: './file-list-item.component.html',
})
export class FileListItemComponent {
  file = input.required<ConvertableFile>();
  removeItem = output<string>();

  constructor(private readonly _converterService: ConverterService) {}

  sendFileConvert(): void {
    this._converterService.convertImage(this.file().file).subscribe(console.log);
  }
}

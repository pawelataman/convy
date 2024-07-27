import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {
  name = input.required<string>();
  size = input.required<string>();
}

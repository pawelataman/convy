import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { NgClass, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiFileType } from '@libs/api/types/api-file-type';

@Component({
  selector: 'app-converter-select-target-search',
  standalone: true,
  imports: [CdkMenu, CdkMenuItem, FormsModule, UpperCasePipe, NgClass],
  templateUrl: './converter-select-target-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterSelectTargetSearchComponent {
  formats = input.required<ApiFileType[]>();
  current = input.required<ApiFileType>();
  searchFormat = model<string>('');
  setTarget = output<ApiFileType>();
  filteredFormats = computed(() => {
    return this.formats().filter((format: ApiFileType) => format.name.toLowerCase().includes(this.searchFormat().toLowerCase()));
  });

  setFormatTarget(target: ApiFileType): void {
    this.setTarget.emit(target);
  }
}

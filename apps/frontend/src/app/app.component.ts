import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PlatformService } from './core/services/platform.service';
import { initFlowbite } from 'flowbite';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [MainLayoutComponent],
  selector: 'app-root',
  template: ` <app-main-layout />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private platformService = inject(PlatformService);

  constructor() {}

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {
      initFlowbite();
    }
  }
}

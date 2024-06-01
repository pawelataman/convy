import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ConfigService } from './core/services/config.service';
import { PlatformService } from './core/services/platform.service';
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
  private configService = inject(ConfigService);

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {
      initFlowbite();
    }

    console.log(this.configService.supportedSourceFileFormats);
  }
}

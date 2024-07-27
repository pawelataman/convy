import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from './core/services/flowbite.service';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [MainLayoutComponent],
  selector: 'app-root',
  template: ` <app-main-layout />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private flowBiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowBiteService.loadFlowbite((_) => {});
  }
}

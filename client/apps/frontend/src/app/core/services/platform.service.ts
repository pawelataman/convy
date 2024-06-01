import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private platformId: NonNullable<unknown> = inject(PLATFORM_ID);

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}

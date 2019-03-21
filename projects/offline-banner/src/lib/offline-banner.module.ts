import { ModuleWithProviders, NgModule } from '@angular/core';
import { UrlConfigService } from './config.service';
import { OfflineBannerComponent } from './offline-banner.component';
import { OfflineBannerService } from './offline-banner.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OfflineBannerComponent],
  imports: [CommonModule],
  exports: [OfflineBannerComponent]
})
export class OfflineBannerModule {
  static forRoot(config: string): ModuleWithProviders {
    return {
      ngModule: OfflineBannerModule,
      providers: [
        OfflineBannerService,
        {
          provide: UrlConfigService,
          useValue: config
        }
      ]
    };
  }
}

import { DatabaseService } from '@backend/common/database/database.service';
import { CoreSettingsModule } from '@backend/core/settings/settings.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DatabaseService],
  imports: [CoreSettingsModule, CoreModule],
  exports: [DatabaseService],
})
export class CoreModule {}

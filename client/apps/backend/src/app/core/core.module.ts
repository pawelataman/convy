import { DatabaseService } from '@backend/common/database/database.service';
import { CoreSettingsModule } from '@backend/core/settings/settings.module';
import { StorageModule } from '@backend/core/storage/storage.module';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DatabaseService],
  imports: [CoreSettingsModule, StorageModule],
  exports: [DatabaseService],
})
export class CoreModule {}

import { Module } from '@nestjs/common';
import { FindAppController } from './controller/find-app.controller';
import { FIND_APP_INBOUND_PORT } from './inbound-port/find-app.inbound-port';
import { FindAppService } from './service/find-app.service';
import { FIND_APP_OUTBOUND_PORT } from './outbound-port/find-app.outbound-port';
import { FindAppGoogleApiOutboundAdapter } from './outbound-adapter/find-app-google-api.outbound-adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FindAppController],
  providers: [
    {
      provide: FIND_APP_INBOUND_PORT,
      useClass: FindAppService,
    },
    {
      provide: FIND_APP_OUTBOUND_PORT,
      useClass: FindAppGoogleApiOutboundAdapter,
    },
  ],
})
export class SearchModule {}

import { Controller, Get, Inject } from '@nestjs/common';
import {
  FIND_APP_INBOUND_PORT,
  FindAppInboundInputDto,
  FindAppInboundPort,
} from '../inbound-port/find-app.inbound-port';

@Controller()
export class FindAppController {
  constructor(
    @Inject(FIND_APP_INBOUND_PORT)
    private readonly findAppInboundPort: FindAppInboundPort,
  ) {}

  @Get('search/app')
  async findApp() {
    return this.findAppInboundPort.execute({
      query: 'searchApp',
    });
  }
}

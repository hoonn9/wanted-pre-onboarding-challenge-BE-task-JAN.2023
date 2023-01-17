import { Inject, Injectable } from '@nestjs/common';
import {
  FindAppInboundInputDto,
  FindAppInboundOutputDto,
  FindAppInboundPort,
} from '../inbound-port/find-app.inbound-port';
import {
  FIND_APP_OUTBOUND_PORT,
  FindAppOutboundPort,
} from '../outbound-port/find-app.outbound-port';

@Injectable()
export class FindAppService implements FindAppInboundPort {
  constructor(
    @Inject(FIND_APP_OUTBOUND_PORT)
    private readonly findAppOutboundPort: FindAppOutboundPort,
  ) {}

  async execute(
    params: FindAppInboundInputDto,
  ): Promise<FindAppInboundOutputDto> {
    return this.findAppOutboundPort.execute({
      query: params.query,
    });
  }
}

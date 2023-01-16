import { Inject, Injectable } from '@nestjs/common';
import {
  GetMembersInboundInputDto,
  GetMembersInboundOutputDto,
  GetMembersInboundPort,
} from '../inbound-port/get-members.inbound-port';
import {
  GET_MEMBERS_OUTBOUND_PORT,
  GetMembersOutboundPort,
} from '../outbound-port/get-members.outbound-port';

@Injectable()
export class GetMembersService implements GetMembersInboundPort {
  constructor(
    @Inject(GET_MEMBERS_OUTBOUND_PORT)
    private readonly getMembersOutboundPort: GetMembersOutboundPort,
  ) {}

  execute(params: GetMembersInboundInputDto): GetMembersInboundOutputDto {
    return this.getMembersOutboundPort.execute();
  }
}

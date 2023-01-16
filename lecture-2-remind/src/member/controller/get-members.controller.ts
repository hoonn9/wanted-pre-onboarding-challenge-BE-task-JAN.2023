import { Controller, Get, Inject } from '@nestjs/common';
import {
  GET_MEMBERS_INBOUND_PORT,
  GetMembersInboundPort,
} from '../inbound-port/get-members.inbound-port';

@Controller()
export class GetMembersController {
  constructor(
    @Inject(GET_MEMBERS_INBOUND_PORT)
    private readonly getMembersInboundPort: GetMembersInboundPort,
  ) {}

  @Get('/members')
  async getMembers() {
    return this.getMembersInboundPort.execute();
  }
}

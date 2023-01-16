import { Injectable } from '@nestjs/common';
import {
  GetMembersOutboundInputDto,
  GetMembersOutboundOutputDto,
  GetMembersOutboundPort,
} from '../outbound-port/get-members.outbound-port';
import { H2Database } from '../../lib/db';

@Injectable()
export class GetMembersH2Repository implements GetMembersOutboundPort {
  execute(params: GetMembersOutboundInputDto): GetMembersOutboundOutputDto {
    return H2Database.member.findAll();
  }
}

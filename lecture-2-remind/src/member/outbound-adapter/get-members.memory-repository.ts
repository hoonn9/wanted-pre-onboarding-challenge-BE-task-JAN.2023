import { Injectable } from '@nestjs/common';
import {
  GetMembersOutboundInputDto,
  GetMembersOutboundOutputDto,
  GetMembersOutboundPort,
} from '../outbound-port/get-members.outbound-port';
import { MemoryDatabase } from '../../lib/db';

@Injectable()
export class GetMembersMemoryRepository implements GetMembersOutboundPort {
  execute(params: GetMembersOutboundInputDto): GetMembersOutboundOutputDto {
    return MemoryDatabase.member.findAll();
  }
}

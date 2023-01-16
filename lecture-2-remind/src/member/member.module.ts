import { Module } from '@nestjs/common';
import { GetMembersController } from './controller/get-members.controller';
import { GET_MEMBERS_INBOUND_PORT } from './inbound-port/get-members.inbound-port';
import { GetMembersService } from './service/get-members.service';
import { GET_MEMBERS_OUTBOUND_PORT } from './outbound-port/get-members.outbound-port';
import { GetMembersH2Repository } from './outbound-adapter/get-members.h2-repository';

@Module({
  controllers: [GetMembersController],
  providers: [
    {
      provide: GET_MEMBERS_INBOUND_PORT,
      useClass: GetMembersService,
    },
    // 쉽게 교체 가능
    // {
    //   provide: GET_MEMBERS_OUTBOUND_PORT,
    //   useClass: GetMembersMemoryRepository,
    // },
    {
      provide: GET_MEMBERS_OUTBOUND_PORT,
      useClass: GetMembersH2Repository,
    },
  ],
})
export class MemberModule {}

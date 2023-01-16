export type GetMembersInboundInputDto = void;
export type GetMembersInboundOutputDto = {
  id: string;
  email: string;
}[];

export const GET_MEMBERS_INBOUND_PORT = 'GET_MEMBERS_INBOUND_PORT' as const;

export interface GetMembersInboundPort {
  execute(params: GetMembersInboundInputDto): GetMembersInboundOutputDto;
}

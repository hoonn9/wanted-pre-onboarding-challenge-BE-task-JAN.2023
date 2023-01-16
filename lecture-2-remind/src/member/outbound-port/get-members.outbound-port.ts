export type GetMembersOutboundInputDto = void;
export type GetMembersOutboundOutputDto = {
  id: string;
  email: string;
}[];

export const GET_MEMBERS_OUTBOUND_PORT = 'GET_MEMBERS_OUTBOUND_PORT' as const;

export interface GetMembersOutboundPort {
  execute(params: GetMembersOutboundInputDto): GetMembersOutboundOutputDto;
}

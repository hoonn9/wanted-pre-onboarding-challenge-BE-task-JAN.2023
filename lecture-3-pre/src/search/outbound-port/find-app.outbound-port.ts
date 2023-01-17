export type FindAppOutboundInputDto = {
  query: string;
};

export type FindAppOutboundOutputDto = {
  appIds: string[];
};

export interface FindAppOutboundPort {
  execute(params: FindAppOutboundInputDto): Promise<FindAppOutboundOutputDto>;
}

export const FIND_APP_OUTBOUND_PORT = 'FIND_APP_OUTBOUND_PORT' as const;

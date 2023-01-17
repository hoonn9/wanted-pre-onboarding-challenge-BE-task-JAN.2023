export type FindAppInboundInputDto = {
  query: string;
};

export type FindAppInboundOutputDto = {
  appIds: string[];
};

export interface FindAppInboundPort {
  execute(params: FindAppInboundInputDto): Promise<FindAppInboundOutputDto>;
}

export const FIND_APP_INBOUND_PORT = 'FIND_APP_INBOUND_PORT' as const;

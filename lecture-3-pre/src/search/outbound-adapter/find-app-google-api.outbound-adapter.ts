import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  FindAppOutboundInputDto,
  FindAppOutboundOutputDto,
  FindAppOutboundPort,
} from '../outbound-port/find-app.outbound-port';
import { searchNumber, unique } from '../../lib/fp';

@Injectable()
export class FindAppGoogleApiOutboundAdapter implements FindAppOutboundPort {
  constructor(private readonly httpService: HttpService) {}

  async execute(
    params: FindAppOutboundInputDto,
  ): Promise<FindAppOutboundOutputDto> {
    /**
     *  const result = await firstValueFrom(
     *       this.httpService.get(
     *         `https://www.googleapis.com/customsearch/v1/siterestrict?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_ENGINE_ID}&q=${params.query}`,
     *       ),
     *     );
     *  api 처리...
     *  item 으로 Serialization
     */

    const items = [
      {
        name: 'instagram',
        link: 'www.google.com/id389562983',
      },
      {
        name: 'instagram (LITE)',
        link: 'www.google.com/id389562983',
      },
      {
        name: 'facebook',
        link: 'www.google.com/id1231231231',
      },
    ];

    const appIds = unique(
      items
        .map((item) => item.link)
        .map((link) => searchNumber('/id', link))
        .filter(this.isAppId),
    );

    return {
      appIds,
    };
  }

  private isAppId(appId: string): boolean {
    return appId.length === 9 || appId.length === 10;
  }
}

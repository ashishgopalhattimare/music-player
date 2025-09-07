import data from './data/library.json';

import type { GetSongListResponse } from '@/types';
import { stringContains as contains, delay, filterList } from './utils';

type QueryOptions = Record<string, unknown>;

export const fetchSongs = (input?: QueryOptions): Promise<GetSongListResponse> => {
  return delay<GetSongListResponse>(data as GetSongListResponse).then((response) => {
    const search = ((input?.search as string) ?? '').toLowerCase();
    if (!search) return response;

    return {
      data: filterList(search, response.data, {
        filter: (metadata, search) => {
          return contains(metadata.title ?? '', search) || contains(metadata.artist ?? '', search);
        },
      }),
    };
  });
};

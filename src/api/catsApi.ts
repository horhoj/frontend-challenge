import { axiosInstance } from './apiTransport';
import { FetchCatListResponseItem } from './cats.types';
import { CATS_PAGE_COUNT } from './const';

const fetchCatList = async () => {
  const res = await axiosInstance.request<FetchCatListResponseItem[]>({
    url: '/images/search',
    params: {
      limit: CATS_PAGE_COUNT,
      order: 'ASC',
    },
  });

  return res.data;
};

export const catsApi = { fetchCatList } as const;

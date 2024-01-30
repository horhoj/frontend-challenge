import { axiosInstance } from './apiTransport';

const fetchCatList = async () => {
  const res = await axiosInstance.request({
    url: '/images/search',
    params: {
      limit: 10,
    },
  });

  return res.data;
};

export const catsApi = { fetchCatList } as const;

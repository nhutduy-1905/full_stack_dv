import useSwr from 'swr'

import fetcher from '../libs/fetcher';

const useBillboard = () => {
  const { data, error, isLoading} = useSwr('/api/random', fetcher, {
    revalidateIfStale: true,         // ✅ Tự động revalidate khi stale
    revalidateOnFocus: true,         // ✅ Revalidate khi user quay lại tab
    revalidateOnReconnect: true,     // ✅ Revalidate khi kết nối lại internet
    dedupingInterval: 60000,         // Cache 60 giây
  });

  return {
    data,
    error,
    isLoading,
  }
};

export default useBillboard;

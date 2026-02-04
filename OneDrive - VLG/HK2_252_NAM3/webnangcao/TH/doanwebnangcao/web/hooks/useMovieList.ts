import useSwr from 'swr'
import { useAppSelector} from "../store/index";
import {movieState} from "../store/movies" 

import fetcher from '../libs/fetcher';

const useMovieList = () => {
  const { data, error, isLoading} = useSwr('/api/movies', fetcher, {
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

export function useGetMovie(){
  const movies = useAppSelector(state => state.movies.movies)

  return (id: string) => {
    const movie = movies.filter(movie => movie.id === id)
    return movie;
  }
}

export default useMovieList;

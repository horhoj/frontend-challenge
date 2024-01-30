import { useEffect } from 'react';
import styles from './CatsPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { catsSlice } from '~/store/catsSlice';
import { CatList } from '~/components/CatList';
import { CatCard } from '~/components/CatCard';
import { FetchCatListResponseItem } from '~/api/cats.types';
import { catsFavoriteSlice } from '~/store/catsFavoriteSlice';

export function CatsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(catsSlice.thunks.fetchCatListThunk());
  }, []);

  const fetchCatListRequest = useAppSelector(
    (state) => state.cats.fetchCatListRequest,
  );

  const favorHash = useAppSelector((state) => state.catsFavorite.hash);

  const handleCatCardClk = (cat: FetchCatListResponseItem) => {
    dispatch(catsFavoriteSlice.actions.add(cat));
  };

  return (
    <div className={styles.CatsPage}>
      <CatList>
        {fetchCatListRequest.data?.map((cat) => (
          <CatCard
            key={cat.id}
            imageSrc={cat.url}
            id={cat.id}
            onClick={() => handleCatCardClk(cat)}
            isFavor={favorHash[cat.id] !== undefined}
          />
        ))}
      </CatList>
    </div>
  );
}

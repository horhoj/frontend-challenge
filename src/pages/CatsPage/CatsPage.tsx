import { useEffect, useRef } from 'react';
import styles from './CatsPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { catsSlice } from '~/store/catsSlice';
import { CatList } from '~/components/CatList';
import { CatCard } from '~/components/CatCard';
import { FetchCatListResponseItem } from '~/api/cats.types';
import { catsFavoriteSlice } from '~/store/catsFavoriteSlice';
import { Spinner } from '~/ui/Spinner';

export function CatsPage() {
  const dispatch = useAppDispatch();

  const fetchCatListRequest = useAppSelector(
    (state) => state.cats.fetchCatListRequest,
  );

  const catList = useAppSelector((state) => state.cats.catList);

  const favorHash = useAppSelector((state) => state.catsFavorite.hash);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(catsSlice.thunks.fetchCatListThunk());
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchCatListRequest.isLoading]);

  useEffect(() => {
    if (fetchCatListRequest.error) {
      alert(JSON.stringify(fetchCatListRequest.error));
    }
  }, [fetchCatListRequest.error]);

  const handleCatCardClk = (cat: FetchCatListResponseItem) => {
    dispatch(catsFavoriteSlice.actions.add(cat));
  };

  return (
    <>
      <Spinner isShow={fetchCatListRequest.isLoading} />

      <div className={styles.CatsPage}>
        <CatList>
          {catList.map((cat) => (
            <CatCard
              key={cat.id}
              imageSrc={cat.url}
              id={cat.id}
              onClick={() => handleCatCardClk(cat)}
              isFavor={favorHash[cat.id] !== undefined}
            />
          ))}
        </CatList>

        {!fetchCatListRequest.isLoading && <div ref={observerTarget}></div>}
        <div className={styles.loader}>... загружаем еще котиков ...</div>
      </div>
    </>
  );
}

import styles from './CatsFavoritePage.module.scss';
import { CatCard } from '~/components/CatCard';
import { CatList } from '~/components/CatList';
import { catsFavoriteSlice } from '~/store/catsFavoriteSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function CatsFavoritePage() {
  const dispatch = useAppDispatch();
  const favorData = useAppSelector((state) => state.catsFavorite.data);

  const handleFavorCardClick = (catId: string) => {
    if (!confirm('УДалить из избранного?')) {
      return;
    }
    dispatch(catsFavoriteSlice.actions.delete({ id: catId }));
  };

  return (
    <div className={styles.CatsFavoritePage}>
      <CatList>
        {favorData.map((cat) => (
          <CatCard
            id={cat.id}
            imageSrc={cat.url}
            key={cat.id}
            onClick={() => handleFavorCardClick(cat.id)}
            isFavor={true}
          />
        ))}
      </CatList>
    </div>
  );
}

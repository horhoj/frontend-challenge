import styles from './CatCard.module.scss';
import { FavorIcon } from '~/assets/icons';

interface CatCardProps {
  imageSrc: string;
  id: string;
  onClick: () => void;
  isFavor: boolean;
}

export function CatCard({ imageSrc, id, onClick, isFavor }: CatCardProps) {
  return (
    <button className={styles.CatCard} onClick={onClick}>
      <img
        src={imageSrc}
        alt={`image for cat with id = ${id}`}
        className={styles.image}
      />
      <span className={styles.favor}>
        <FavorIcon isFavor={isFavor} />
      </span>
    </button>
  );
}

import styles from './CatList.module.scss';

interface CatListProps {
  children?: React.ReactNode;
}
export function CatList({ children }: CatListProps) {
  return <div className={styles.CatList}>{children}</div>;
}

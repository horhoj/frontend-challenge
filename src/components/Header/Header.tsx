import { HeaderNavLink } from '../HeaderNavLink';
import styles from './Header.module.scss';
import { Portal } from '~/ui/Portal';
import { ROUTES } from '~/router';

export function Header() {
  return (
    <Portal>
      <header className={styles.Header}>
        <nav>
          <ul className={styles.navList}>
            <HeaderNavLink to={ROUTES.CATS}>Все котики</HeaderNavLink>
            <HeaderNavLink to={ROUTES.CATS_FAVORITE}>
              Любимые котики
            </HeaderNavLink>
          </ul>
        </nav>
      </header>
    </Portal>
  );
}

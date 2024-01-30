import styles from './App.module.scss';
import { Header } from '~/components/Header';
import { Router } from '~/router';

export function App() {
  return (
    <div className={styles.App}>
      <Header />
      <main>
        <Router />
      </main>
    </div>
  );
}

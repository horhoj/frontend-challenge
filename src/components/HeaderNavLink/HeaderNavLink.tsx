import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HeaderNavLink.module.scss';

interface HeaderNavLinkProps {
  children?: React.ReactNode;
  to: string;
}
export function HeaderNavLink({ children, to }: HeaderNavLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(styles.HeaderNavLink, isActive && styles.active)
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

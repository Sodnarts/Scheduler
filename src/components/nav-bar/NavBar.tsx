import './NavBar.styles.scss';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Home } from './buttons/Home';
import { Todos } from './buttons/Todos';
import { Settings } from './buttons/Settings';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav--container">
      <Link to={routes.settings} className={`nav--link ${location.pathname === routes.settings && 'nav--link-active'}`}>
        <Settings pathname={location.pathname} />
      </Link>
      <Link
        to={routes.dashboard}
        className={`nav--link ${location.pathname === routes.dashboard && 'nav--link-active'}`}
      >
        <Home pathname={location.pathname} />
      </Link>
      <Link to={routes.todos} className={`nav--link ${location.pathname === routes.todos && 'nav--link-active'}`}>
        <Todos pathname={location.pathname} />
      </Link>
    </nav>
  );
};

export { NavBar };

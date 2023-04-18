import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import UserProfile from '../user-profile/user-profile';

function Header():JSX.Element {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {pathname === AppRoute.Login ? '' : <UserProfile />}
        </div>
      </div>
    </header>
  );
}

export default Header;

import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '../../const';
import Header from '../header/header';
import SvgSprite from '../svg-sprite/svg-sprite';

function Layout():JSX.Element {
  const { pathname } = useLocation();
  const wrapperClassName = classNames('page', {
    'page--gray page--main': pathname === AppRoute.Root,
    'page--gray page--login': pathname === AppRoute.Login
  });

  return (
    <div className={wrapperClassName}>
      <Header />
      <SvgSprite />
      <Outlet />
    </div>
  );
}

export default Layout;

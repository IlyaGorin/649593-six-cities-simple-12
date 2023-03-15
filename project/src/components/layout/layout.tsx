
import { Outlet } from 'react-router';
import Header from '../header/header';
import SvgSprite from '../svg-sprite/svg-sprite';

function Layout():JSX.Element {
  return (
    // TODO добавить передачу классов?
    <div className="page page--gray page--main">
      <Header />
      <SvgSprite />
      <Outlet />
    </div>
  );
}

export default Layout;

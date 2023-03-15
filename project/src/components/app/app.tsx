import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import Layout from '../layout/layout';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';

type AppProps = {
  offersCount: number;
  offers: Offers[];
}

function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route
              path={AppRoute.Root}
              element={<MainScreen offersCount={offersCount} offers={offers} />}
            />
            <Route path={AppRoute.Room}>
              <Route index element={<RoomScreen />}/>
              <Route path={AppRoute.RoomId} index element={<RoomScreen />}/>
            </Route>
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
          </Route>
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import { AppRoute, LocationNameType } from '../../const';
import { Offers } from '../../types/offers';
import { Review } from '../../types/reviews';
import Layout from '../layout/layout';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';

type AppProps = {
  nearbyOffers:Offers[];
  reviews: Review[];
  locationsNames: LocationNameType;
}

function App({reviews, nearbyOffers, locationsNames}: AppProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route
              path={AppRoute.Root}
              element={<MainScreen locationsNames={locationsNames} />}
            />
            <Route path={AppRoute.Room}>
              <Route index element={<RoomScreen nearbyOffers={nearbyOffers} reviews={reviews}/>}/>
              <Route path={AppRoute.RoomId} index element={<RoomScreen nearbyOffers={nearbyOffers} reviews={reviews}/>}/>
            </Route>
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
            <Route
              path={AppRoute.Login}
              element={<LoginScreen />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

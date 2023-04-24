import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { AppRoute, LocationNameType } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import Layout from '../layout/layout';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import RoomScreen from '../../pages/room-screen/room-screen';

type AppProps = {
  locationsNames: LocationNameType;
}

function App({ locationsNames }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route
              path={AppRoute.Root}
              element={<MainScreen locationsNames={locationsNames} />}
            />
            <Route path={AppRoute.RoomId} element={<RoomScreen />}/>
            <Route
              path='*'
              element={<NotFoundScreen />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <LoginScreen />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;

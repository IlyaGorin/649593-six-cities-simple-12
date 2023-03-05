import MainScreen from '../../pages/main-screen/main-screen';
import { Offers } from '../../types/offers';

type AppProps = {
  offersCount: number;
  offers: Offers[];
}

function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <MainScreen offersCount={offersCount} offers={offers}/>
  );
}

export default App;

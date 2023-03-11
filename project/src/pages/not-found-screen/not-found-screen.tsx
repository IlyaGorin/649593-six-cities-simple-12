import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import './not-found-screen.css';

function NotFoundScreen():JSX.Element {
  return (
    <section className='not-found-page'>
      <Helmet>
        <title>six cities simple: 404 Not Found</title>
      </Helmet>
      <h1 className='not-found-page__title'>404 Not Found</h1>
      <Link className='not-found-page__link' to='/'>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;

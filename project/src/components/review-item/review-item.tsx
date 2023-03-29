import { Review } from '../../types/reviews';
import { formatDate } from '../../utils/utils';
import { calculateRating } from '../../utils/utils';

type ReviewItemProps = {
  review:Review;
}

function ReviewItem({review}:ReviewItemProps):JSX.Element {
  const {user} = review;
  const date = formatDate(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${calculateRating(review.rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
        </p>
        <time className="reviews__time" dateTime={date.isoDate}>{date.monthYear}</time>
      </div>
    </li>
  );
}

export default ReviewItem;

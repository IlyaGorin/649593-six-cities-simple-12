import { Review } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}:ReviewsListProps):JSX.Element {
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    //TODO добавить ограничение на вывод не более 10 отзывов
    <ul className="reviews__list">
      {sortedReviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
    </ul>
  );
}

export default ReviewsList;

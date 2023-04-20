import { Review } from '../../types/reviews';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: Review[];
}

const MAX_COMMENT_COUNT = 10;

function ReviewsList({reviews}:ReviewsListProps):JSX.Element {
  const sortedReviews = [...reviews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, MAX_COMMENT_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{sortedReviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => <ReviewItem review={review} key={review.id}/>)}
      </ul>
    </>
  );
}

export default ReviewsList;


import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import "./ReviewCard.css";

const ReviewCard = ({ review, sessionUser }) => {

  const dispatch = useDispatch();
  console.log("user---", sessionUser)
  console.log("review---", review)

  if(!review) return null;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id))
  }

  // if(!sessionUser || !review) return null;

  return (
    <div className="review-card-container">
      <div className="fa fa-star fa-xs review-card-stars">
        {review.stars}
      </div>
      <div className="review-card-review">{review.review}</div>

      <div>
        {
          <button className="delete-review" onClick={handleDelete}>Delete Review</button>
      }
      </div>

    </div>
  )
}

export default ReviewCard;

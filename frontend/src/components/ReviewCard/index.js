
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';

const ReviewCard = ({ review, user }) => {

  const dispatch = useDispatch();



  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id))
  }

  return (
    <div className="review-card-container">
      <div className="preview-image-container">
      </div>

      <div> {
        review.userId === user.id && (
          <button className="delete-review">Delete Review</button>
        )
      }
      </div>
    </div>
  )
}

export default ReviewCard;

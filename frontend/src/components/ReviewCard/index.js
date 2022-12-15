
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import reviewsReducer, { deleteReview, getAllReviews, getUserReviews } from '../../store/reviews';
import spotsReducer, { getSpot } from '../../store/spots';
import "./ReviewCard.css";

const ReviewCard = ({ review, onDelete }) => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  // const history = useHistory();
  const { spotId } = useParams();

  const reviewedBy = review?.User?.firstName

  useEffect(() => {
    dispatch(getAllReviews(spotId))
  }, [spotId])


  if (!review) return null;


  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id)).then(() => {
      dispatch(getSpot(spotId)).then(() => {
        dispatch(getAllReviews(spotId))
      })
      // history.push(`/spots/${spotId}`)
    })
    if (onDelete) {
      onDelete();
    }
  }

  // if(!sessionUser || !review) return null;

  
  return (
    <div className="review-card-container">
      <div className="review-stars-delete">
        <div>
          <i className="fa fa-star fa-xs review-card-stars"></i>
          <span>
            {review.stars}
          </span>
        </div>
        {sessionUser?.id === review.userId &&
          <div>
            <button className="delete-button" onClick={handleDelete}>Delete Review</button>
          </div>
        }
      </div>
      <div>
        {reviewedBy}
      </div>
      <div>
        {new Date(review?.createdAt).toLocaleDateString(undefined, {
          month: "long",
          year: "numeric"
        })}
      </div>
      <div className="review-card-review">{review.review}</div>
    </div>
  )
}

export default ReviewCard;

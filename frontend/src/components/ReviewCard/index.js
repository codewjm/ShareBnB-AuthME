
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import reviewsReducer, { deleteReview, getAllReviews } from '../../store/reviews';
import spotsReducer, { getSpot } from '../../store/spots';
import "./ReviewCard.css";

const ReviewCard = ({ review, onDelete }) => {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const history = useHistory();
  const { spotId } = useParams();


  let owner;
  if ( sessionUser && review) {
    owner = sessionUser.id === review;
  }
  // console.log("user---", sessionUser)
  // console.log("review---", review)



  if(!review) return null;



  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id)).then(() => {
    dispatch(getSpot(spotId))
      // history.push(`/spots/${spotId}`)
    })
    if(onDelete) {
      onDelete();
    }
  }

  // if(!sessionUser || !review) return null;

  return (
    <div className="review-card-container">
      <div className="fa fa-star fa-xs review-card-stars">
        {review.stars}
      </div>
      <div className="review-card-review">{review.review}</div>
    { sessionUser?.id === review.userId &&
      <div>
          <button className="delete-button" onClick={handleDelete}>Delete Review</button>
      </div>
    }

    </div>
  )
}

export default ReviewCard;

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpot, deleteSpot } from "../../store/spots";
import EditSpotFormModal from "../EditSpotFormModal";
import reviewsReducer, { getAllReviews } from "../../store/reviews";
import ReviewCard from "../ReviewCard"
import ReviewSpotModal from "../ReviewSpotModal";
import "./SingleSpotPage.css";

function SingleSpotPage() {

  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = useSelector((state) => (state.spots[spotId]));
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.spotReviews);

  const onReviewDelete = () => {
    dispatch(getAllReviews(spotId))
  };

  useEffect(() => {
    dispatch(getSpot(spotId))
      .then(() => setIsLoaded(true))
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId]);

  const removeSpot = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId))
      .then(() => {
        history.push("/");
      })
  };

  if (!spot) return null;

  return (isLoaded && spot && (
    <div className="master-spot-container">
      <div className="spot-header-container">
        <div className="spot-name-header">{spot?.name}</div>
        <div className="spot-details-header">
          <div className="spot-rating-header">
            <i className="fa fa-star fa-xs this-star-align"></i> ·
            <span className="rating-align">{!spot.avgStarRating ? "0.00" : spot.avgStarRating}</span>
          </div> ·
          <div className="spot-num-reviews-header">{!spot.numReviews ? 0 : spot.numReviews} review(s)</div> ·
          <div className="spot-location">{spot?.city}, {spot?.state}, {spot?.country}</div>
        </div>
      </div>
      <div className="image-container">
        {spot?.Images && (
          <img className="spot-image" src={spot?.Images[0]?.url} alt="Spot Image" />
        )
        }
      </div>
      <div className="spot-footer-container">
        <div className="spot-description">{spot?.description}</div>
        <div className="spot-price-rating-reviews">
          <div className="spot-price">${spot?.price}<div className="night-price">night</div>
          </div>

          <div className="spot-review-rating">
            <div className="spot-rating-a fa fa-star fa-xs"></div> ·
            <span>
              {!spot.avgStarRating ? "0.00" : spot.avgStarRating}
            </span> ·
            <div className="spot-reviews-a">{!spot.numReviews ? 0 : spot.numReviews} review(s)</div>
          </div>

        </div>
      </div>
      <div className="update-spot-container">
        {sessionUser ?
          <> {sessionUser?.id === spot?.ownerId && <div>
            <EditSpotFormModal />
            <button onClick={(e) => removeSpot(e)} className="review-modal-delete">Delete Spot</button>
          </div>}
          </> : <></>
        }
      </div>
      <div className="spot-reviews-header">
        <div className="spot-rating-reviews-container">
          <div className="fa fa-star fa-xs icon-align"></div> ·
          <div class-name="spot-rating-b">
            {!spot.avgStarRating ? "0.00" : spot.avgStarRating}
          </div>  ·
          <div className="spot-reviews-b">{!spot.numReviews ? 0 : spot.numReviews} review(s)</div>
        </div>
        {sessionUser && sessionUser?.id !== spot.Owner.id && (
          <button className="review-modal-button">
            <ReviewSpotModal />
          </button>
        )
        }
      </div>
      <div className="all-spot-reviews">

        {reviews && (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} user={sessionUser} onDelete={() => onReviewDelete()} />
          )))}
      </div>
    </div>
  )
  )
}



export default SingleSpotPage;

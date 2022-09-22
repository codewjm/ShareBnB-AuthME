import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpot, deleteSpot, getAllSpots } from "../../store/spots";
import EditSpotFormModal from "../EditSpotFormModal";

function SingleSpotPage() {

  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spot = useSelector((state) => (state.spots[spotId]));
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpot(spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId]);

  const removeSpot = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId))
    // .then(() => {
    //   dispatch(getAllSpots())
    // });
    history.push("/my-listings");
  };

  return isLoaded && (
    <>
      <div className="spot-header-container">
        <div className="spot-name-header">{spot?.name}</div>
        <div className="spot-details-header">
          <div className="spot-rating-review">{spot?.avgStarRating} {spot?.numReviews} review(s)</div>
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
          <div className="spot-price">${spot?.price}</div>
          <div className="spot-rating-a">{spot?.avgStarRating}</div>
          <div className="spot-reviews-a">{spot?.numReviews} review(s)</div>
        </div>
      </div>
      <div className="spot-reviews-header">
        <div className="spot-rating-b">{spot?.avgStarRating}</div>
        <div className="spot-reviews-b">{spot?.numReviews} review(s)</div>
      </div>
      <div className="all-spot-reviews">
        {/* all reviews go here */}
      </div>
      <div>
        {sessionUser ?
          <> {sessionUser?.id === spot?.ownerId && <div>
            <EditSpotFormModal />
            <button onClick={(e) => removeSpot(e)}>Delete Spot</button>
          </div>}
          </> : <></>
        }
      </div>
    </>
  )
}



export default SingleSpotPage;

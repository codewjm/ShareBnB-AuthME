import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpot, deleteSpot } from "../../store/spots";
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
    await dispatch(deleteSpot(spotId));
    history.push("/user/spots");
  };

  return isLoaded && (
    <>
      <h1> Spot Details </h1>
      <div>{spot?.name}</div>
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

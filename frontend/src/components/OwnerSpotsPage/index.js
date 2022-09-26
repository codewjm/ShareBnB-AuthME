import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOwnerSpots } from "../../store/spots"
import { Redirect } from "react-router-dom";
import SpotCard from "../SpotCard";
import "../SpotCard/SpotCard.css";

export default function OwnerSpotsPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user))
  const spots = useSelector((state) => state.spots.userSpots)



  useEffect(() => {
    dispatch(getOwnerSpots())
  }, [dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  if(!spots) return null;

  return (
      <div>
        <h1>My Listings</h1>
        <div className="card-container">
          {spots.map((spot) => (
            <SpotCard key={spot?.id} spot={spot} />
          ))}
        </div>
      </div>
  )
}

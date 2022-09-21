import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOwnerSpots } from "../../store/spots"
import { Redirect } from "react-router-dom";
import SpotCard from "../SpotCard";
import "../SpotCard/SpotCard.css";

export default function OwnerSpotsPage() {

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state => state.session.user))
  const spots = useSelector((state) => state.spots)
  const ownerSpots = Object.values(spots)
//  const spot = ownerSpots[0]
//  console.log("spot at index 0", spot)
console.log("ownerSpots:", ownerSpots)

  useEffect(() => {
    dispatch(getOwnerSpots())
      .then(() => setIsLoaded(true))
  }, [dispatch, isLoaded])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  return (
      <div>
        <h1>My Listings</h1>
        <div className="card-container">
          {ownerSpots.map((spot) => (
            <SpotCard key={spot?.id} spot={spot} />
          ))}
        </div>
      </div>
  )
}

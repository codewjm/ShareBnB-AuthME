import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SplashPage.css';
import SpotCard from '../SpotCard';


/*

*/
const filteredSpots = (spotsState) => {
  //get all the object entries (the key-value pairs)
  return Object.entries(spotsState).filter((entry) => {
    // filtering key-value pairs array into a new array without the userSpots entry
    return entry[0] !== "userSpots"

  }).map(entry => entry[1])
}


const SplashPage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = filteredSpots(allSpotsObj);


  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])
  if (!allSpots.length) return null;

  return (
    <div className="card-positions">
      {allSpots.map((spot) => (
        <SpotCard key={spot?.id} spot={spot} />
      ))}
    </div>
  )
}

export default SplashPage;

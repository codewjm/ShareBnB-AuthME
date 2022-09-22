import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SplashPage.css';
import SpotCard from '../SpotCard';

const SplashPage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = Object.values(allSpotsObj);
  console.log("all spots: ----- ", allSpots)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  if(!allSpots.length) return null;

  return (

        <div className="card-positions">
          {allSpots.map((spot) => (
            <SpotCard key={spot?.id} spot={spot}/>
          ))}
        </div>

  )
}

export default SplashPage;

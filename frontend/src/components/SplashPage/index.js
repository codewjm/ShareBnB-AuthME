import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SplashPage.css';
import SpotCard from '../SpotCard';

const SplashPage = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (

        <div className="card-positions">
          {allSpots.map((spot) => (
            <SpotCard key={spot?.id} spot={spot}/>
          ))}
        </div>

  )
}

export default SplashPage;

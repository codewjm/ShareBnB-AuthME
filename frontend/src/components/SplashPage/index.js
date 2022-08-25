import { useEffect } from 'react';
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
    <>
      <div>
        <div>
          <h1> Splash Page </h1>
          {allSpots.map((spot) => (
            <SpotCard spot={spot}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default SplashPage;

import { Link } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot }) => {

  return (
    <Link to={`/spots/${spot?.id}`}>
      <h1>
        {spot?.name}
      </h1>
    </Link>

  )
}

export default SpotCard;

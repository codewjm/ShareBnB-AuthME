import { Link } from 'react-router-dom';
import './SpotCard.css';
const SpotCard = ({ spot }) => {

  return (
    <div>
      <h1>
        {spot?.name}
      </h1>
    </div>
  )
}

export default SpotCard;

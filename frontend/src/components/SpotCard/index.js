import { Link } from 'react-router-dom';
import './SpotCard.css';

const SpotCard = ({ spot }) => {

  return (
    <div className="card-container">
      <Link to={`/spots/${spot?.id}`}>
        <div className="preview-image-container">
          <img src={spot?.previewImage} className="preview-image"></img>
        </div>
        <div>
          {spot?.name}
        </div>
        <div>{spot?.avgRating}</div>
        <div>{spot?.city}</div>
        <div>{spot?.state}</div>
        <div>{spot?.price}</div>
        <div>night</div>

      </Link>
    </div>

  )
}

export default SpotCard;

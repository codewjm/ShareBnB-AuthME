import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots"
import "./EditSpotForm.css"

// redirect is the same as history.push()
function EditSpotForm() {
  const dispatch = useDispatch();
  const { spotId } = useParams()
  const userSpots = useSelector((state) => state.spots)
  const spot = userSpots[spotId]
  const [name, setName] = useState(spot?.name);
  const [address, setAddress] = useState(spot?.address);
  const [price, setPrice] = useState(spot?.price);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);


const editedSpotData = {
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      description: description,
      price: price,
    }



    await dispatch(updateSpot(spot.id, editedSpotData))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
      }
    });
  }


return (
  <form onSubmit={handleSubmit}>
    <h2>Edit Your Spot</h2>
    <div className="newSpot_error">
      {errors.map((error, idx) => (
        <div key={idx}>{error}</div>
      ))}
    </div>
    <label>
      <input
        type="text"
        value={name}
        placeholder = "New Spot Name"
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <label>
      <input
        type="text"
        value={description}
        placeholder = "New Spot Description"
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
    <label>
    </label>
    <div>
    <input
        type="text"
        value={address}
        placeholder = "Spot Address"
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        value={city}
        placeholder = "Spot City"
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        value={state}
        placeholder = "Spot State"
        onChange={(e) => setState(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        value={country}
        placeholder = "Spot Country"
        onChange={(e) => setCountry(e.target.value)}
      />
    </div>
    <div>
        <input
          type="number"
          value={lat}
          placeholder="Spot Latitude"
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          value={lng}
          placeholder="Spot Longitude"
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
    <label>
      <input
        type="number"
        value={price}
        placeholder="$0.00"
        min = {1}
        onChange={(e) => setPrice(e.target.value)}
      />
    </label>
    <button type="submit" className="post-review-btn">Update Spot</button>
  </form>
);
}

export default EditSpotForm;

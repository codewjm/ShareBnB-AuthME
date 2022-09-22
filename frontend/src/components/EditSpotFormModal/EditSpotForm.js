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
  // implement if history.push is giving you issues
  // const sessionUser = useSelector((state) => state.session.user);
  // const history = useHistory()
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [description, setDescription] = useState(spot?.description);
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // console.log("spot image", spot.Images)

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
      // Images: spot.Images

      // name,
      // address,
      // city,
      // state,
      // country,
      // lat,
      // lng,
      // description,
      // price
    }



    await dispatch(updateSpot(spot.id, editedSpotData))
    .catch(async (res) => {
      // const data = await res.json();
      const data = await res.json();
      console.log("Error Data:---------", data)
      console.log("Error Data.ERROR:---------", data.errors)
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
        console.log("my errors: ---------- ", errors)
      }
    });
    // await history.push(`/spots/${spot.id}`)
  }


return (
  <form onSubmit={handleSubmit}>
    <ul className="newSpot_error">
      {errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
    <label>
        <h4>Edit Spot Name</h4>
      <input
        type="text"
        value={name}
        placeholder = "New Spot Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
    </label>
    <label>
        <h4>Edit Spot Description</h4>
      <input
        type="text"
        value={description}
        placeholder = "New Spot Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </label>
    <label>
      <h4>Edit Spot Location</h4>
    </label>
    <div>
    <input
        type="text"
        value={address}
        placeholder = "Spot Address"
        onChange={(e) => setAddress(e.target.value)}
        required
      />
    </div>
    <div>
      <input
        type="text"
        value={city}
        placeholder = "Spot City"
        onChange={(e) => setCity(e.target.value)}
        required
      />
    </div>
    <div>
      <input
        type="text"
        value={state}
        placeholder = "Spot State"
        onChange={(e) => setState(e.target.value)}
        required
      />
    </div>
    <div>
      <input
        type="text"
        value={country}
        placeholder = "Spot Country"
        onChange={(e) => setCountry(e.target.value)}
        required
      />
    </div>
    <div>
        <input
          type="number"
          value={lat}
          placeholder="Spot Latitude"
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={lng}
          placeholder="Spot Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </div>
    <label>
    <h4>Edit Spot Price</h4>
      <input
        type="number"
        value={price}
        placeholder="$0.00"
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </label>
    <button type="submit">Sumbit Edits</button>
  </form>
);
}

export default EditSpotForm;

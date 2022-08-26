import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot } from "../../store/spots"
import "./EditSpotForm.css"

// redirect is the same as history.push()
function EditSpotForm({ spot }) {
  const dispatch = useDispatch();
  // implement if history.push is giving you issues
  // const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [description, setDescription] = useState(spot?.description);
  const [address, setAddress] = useState(spot?.address)
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [previewImage, setPreviewImage] = useState(spot?.previewImage);
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
      previewImage: previewImage,
      description: description,
      price: price
    }


    await dispatch(updateSpot(spot.id, editedSpotData))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    await history.push(`/spots/${spot.id}`)
  }


return (
  <form onSubmit={handleSubmit}>
    <ul className="newSpot_error">
      {Object.values(errors).map((error, idx) => (
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
      <h4>Edit Image</h4>
      <input
        type="text"
        value={previewImage}
        placeholder="url"
        onChange={(e) => setPreviewImage(e.target.value)}
        required
      />
    </label>
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

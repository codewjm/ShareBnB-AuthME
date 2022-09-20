import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import "./CreateSpotForm.css";
import { createSpot } from "../../store/spots"

// redirect is the same as history.push()
function CreateSpotForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // implement if Redirect is giving you issues
  // const history = useHistory()
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  // const [submit, setSumbit] = useState(false); this will be for closing modal


  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpotData = {
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
    setErrors([]);

    await dispatch(createSpot(newSpotData)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }


  return (
    <form onSubmit={handleSubmit}>
      <ul className="newSpot_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <h4>Name Your Spot</h4>
        <input
          type="text"
          value={name}
          placeholder="New Spot Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <h4>How Would You Describe Your Spot?</h4>
        <input
          type="text"
          value={description}
          placeholder="New Spot Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        <h4>Where Is Your Spot Located?</h4>
      </label>
      <div>
        <input
          type="text"
          value={address}
          placeholder="New Spot Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={city}
          placeholder="New Spot City"
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={state}
          placeholder="New Spot State"
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={country}
          placeholder="New Spot Country"
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={lat}
          placeholder="New Spot Latitude"
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={lng}
          placeholder="New Spot Longitude"
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </div>
      <label>
        <h4>Upload an image of your spot</h4>
        <input
          type="text"
          value={previewImage}
          placeholder="url"
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
      </label>
      <label>
        <h4>Set your price for your spot</h4>
        <input
          type="number"
          value={price}
          placeholder="$0.00"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create New Spot</button>
    </form>
  );
}

export default CreateSpotForm;

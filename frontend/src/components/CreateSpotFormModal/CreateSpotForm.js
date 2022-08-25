import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./CreateSpotForm.css";
// redirect is the same as history.push()
function CreateSpotForm() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
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


  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = (e) => {
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

    const newSpot = await dispatch(createSpot(newSpotData)).then(async (res) => {
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
        <h2>Name Your Spot</h2>
      <input
        type="text"
        value={name}
        placeholder = "Potential New Spot Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
    </label>
    <label>
        <h2>How Would You Describe Your Spot?</h2>
      <input
        type="text"
        value={description}
        placeholder = "Potential New Spot Description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </label>
    <label>
      <h2>Where Is Your Spot Located?</h2>
      <input
        type="text"
        value={address}
        placeholder = "Potential New Spot Address"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </label>
    <label>
      Username
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </label>
    <label>
      Password
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </label>
    <label>
      Confirm Password
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </label>
    <button type="submit">Sign Up</button>
  </form>
);
}

export default CreateSpotForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./CreateSpotForm.css";
import { createSpot, addSpotImage } from "../../store/spots"


// redirect is the same as history.push()
function CreateSpotForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  // const newSpot = useSelector((state) => state.spots.userSpots)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState([]);
  const [submited, setSubmited] = useState(false);

  const latRegX = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,15})?$/
  const lngRegX = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,15})?$/
  const imageRegX = /\.(jpeg|jpg|png|svg|gif)$/

  useEffect(() => {
    let errors = [];
    if (name.length === 0) errors.push("Provide a valid name");
    if (address.length === 0) errors.push("Provide a valid spot address");
    if (city.length === 0) errors.push("Provide a valid spot city");
    if (state.length === 0) errors.push("Provide a valid spot state");
    if (country.length === 0) errors.push("Provide a valid spot country");
    if (!lat.match(latRegX)) errors.push("Provide a valid spot latitude");
    if (!lng.match(lngRegX)) errors.push("Provide a valid spot longitude");
    if (description.length < 1 || description.length > 300) errors.push("Provide a spot description under 300 characters");
    if (price < 1) errors.push("Please enter a price per night");
    if (image.length < 1 || !image.split('?')[0].match(imageRegX)) {
      errors.push("Provide a valid image URL");
    }
    setErrors(errors);
  }, [name, address, city, state, country, lat, lng, description, image, price]) ;


  if (!sessionUser) return <Redirect to="/signup" />;



const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmited(true)

    if (errors.length > 0) {return}

  const createdSpot = await dispatch(
    createSpot({
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price,
    })
  );

const imageData = {
  previewImage: true,
  url: image,
};


  dispatch(addSpotImage(imageData, createdSpot.id));

  history.push(`/spots/${createdSpot.id}`);
}



  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Spot</h2>
      <ul className="newSpot_error">
      { submited && errors.map((error) => (
    <div className="error-message">
      {error}
    </div>
  ))}
        {/* { submited && formErrors} */}
      </ul>
      <label>
        <input
          type="text"
          value={name}
          placeholder="New Spot Name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <input
          type="text"
          value={description}
          placeholder="New Spot Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
      </label>
      <div>
        <input
          type="text"
          value={address}
          placeholder="New Spot Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={city}
          placeholder="New Spot City"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={state}
          placeholder="New Spot State"
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={country}
          placeholder="New Spot Country"
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          value={lat}
          placeholder="New Spot Latitude"
          onChange={(e) => setLat(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          value={lng}
          placeholder="New Spot Longitude"
          onChange={(e) => setLng(e.target.value)}
        />
      </div>
      <label>
        <input
          type="text"
          value={image}
          placeholder="url"
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label>
        <input
          type="number"
          value={price}
          placeholder="$0.00"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button type="submit" className="post-review-btn">Create New Spot</button>
    </form>
  );
}

export default CreateSpotForm;

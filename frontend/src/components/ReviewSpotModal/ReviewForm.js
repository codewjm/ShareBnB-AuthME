import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviews"


// redirect is the same as history.push()
export default function ReviewForm() {
  // const history = useHistory()
  const params = useParams();

  const { spotId } = params;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);


  // const [submit, setSumbit] = useState(false); this will be for closing modal




  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReviewData = {
      review,
      stars
    }

    setErrors([]);


    await dispatch(createReview(newReviewData, spotId))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
        else if (data && data.message) setErrors([data.message])
      }
      )
  }


  return (
    <form onSubmit={handleSubmit}>
      <ul className="newReview_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <input
          className="review-input"
          type="text"
          value={review}
          placeholder="Review Description"
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          value={stars}
          min = {1}
          max = {5}
          placeholder="Star Rating 1 - 5"
          onChange={(e) => setStars(e.target.value)}
        />
      </div>
    </form>
  );
}

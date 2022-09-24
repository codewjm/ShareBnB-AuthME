import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserReviews } from "../../store/reviews"
import { Redirect } from "react-router-dom";
import ReviewCard from "../ReviewCard";


export default function UserReviewsPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const userReviewsObj = useSelector((state) => state.reviews?.userReviews);
  const userReviews = Object.values(userReviewsObj);
  // console.log("UserReviewPage-------", userReviews)

  useEffect(() => {
    dispatch(getUserReviews())
  }, [dispatch])

  if (!sessionUser) {
    return <Redirect to="/" />
  }

  if(!userReviews) return null;

  return (
      <div>
        <h1>My Reviews</h1>
        <div className="review-page-card-container">

          {userReviews?.map((review) => (
            <ReviewCard review={review} sessionUser={sessionUser}/>
          ))}

        </div>
      </div>
  )
};

import { csrfFetch } from './csrf';

// Actions Section - CRD (no update)
const CREATE_REVIEW = 'reviews/createReview';
const LOAD_ALL_REVIEWS = 'reviews/getAllReviews';
const DELETE_REVIEW = 'reviews/deleteReview';
const LOAD_USER_REVIEWS = 'reviews/getUserReviews'

// Action Creators Section
const createOne = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  };
};

const loadAll = (reviews) => {
  return {
    type: LOAD_ALL_REVIEWS,
    reviews
  };
};

const deleteOne = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

const loadUserReviews = (userReviews) => {
   return {
    type: LOAD_USER_REVIEWS,
    userReviews
   }
}


// Thunks Section

// Create a review for a spot by Spot's Id
export const createReview = (review, spotId) => async (dispatch) => {
  console.log("review-------------", review)
  console.log("spotId---------------", spotId)
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (res.ok) {
    const newReview = await res.json();
    console.log("newReview------------", newReview)
    dispatch(createOne(newReview));
  };
};


// Get all Reviews by a Spot's Id
export const getAllReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviewsData = await res.json();
    dispatch(loadAll(reviewsData.Reviews))
  }
};


// Delete a review by Id
export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteOne(deleteOne))
  };
};

// Get all reviews from the current user
export const getUserReviews = () => async (dispatch) => {
  // console.log("in Thunk")
  const res = await csrfFetch(`/api/reviews/current`)

  if(res.ok) {
    const userReviews = await res.json();
    // console.log("userReviews THUNK---", userReviews)
    dispatch(loadUserReviews(userReviews.Reviews))
  }
}

// Reducer Section
let initialState = { userReviews: {}, spotReviews: []};
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW: {
      const newState = { ...state, spotReviews: [ ...state.spotReviews] };
      newState.spotReviews.push(action.review);
      newState.userReviews[action.review.id] = action.review;
      return newState;
    }
    case LOAD_ALL_REVIEWS: {
      let newState = { ...state, spotReviews: [ ...state.spotReviews] };
      newState.spotReviews = action.reviews
      return newState;
    }
    case LOAD_USER_REVIEWS: {
      const newState = { ...state, userReviews: { } };
      // console.log("action.userReviews", action.userReviews)
      action.userReviews.forEach(review => newState.userReviews[review.id] = review)
      // console.log("newState.userReviews ______", newState.userReviews)
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      newState.spotReviews = newState.spotReviews.filter(
        el => el.id !== action.reviewId
      );
      delete newState.userReviews[action.reviewId]
      return newState;
    }
    default:
      return state;
  }
}

export default reviewsReducer;

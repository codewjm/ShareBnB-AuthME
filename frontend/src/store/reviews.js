import { csrfFetch } from './csrf';

// Actions Section - CRD (no update)
const CREATE_REVIEW = 'reviews/createReview';
const LOAD_ALL_REVIEWS = 'reviews/getAllReviews';
const DELETE_REVIEW = 'reviews/deleteReview';

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
    // reviewId
  }
}


// Thunks Section

// Create a review for a spot by Spot's Id
export const createReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(createOne(newReview));
  };
};


// Get all Reviews by a Spot's Id
export const getAllReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadAll(reviews.Reviews))
  };
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


// Reducer Section
let initialState = {};
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case LOAD_ALL_REVIEWS: {
      const newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      })
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
}

export default reviewsReducer;

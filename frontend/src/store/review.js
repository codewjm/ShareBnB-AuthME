import { csrfFetch } from './csrf';

// Actions Section - CRUD
const LOAD_ALL_REVIEWS = 'reviews/getAllReviews';
const CREATE_REVIEW = 'reviews/createReview';
const LOAD_REVIEW = 'reviews/getReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// Action Creators Section
const loadAll = (reviews) => {
  return {
    type: LOAD_ALL_REVIEWS,
    reviews
  };
};

const createOne = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  };
};

// Thunks Section

// Get all reviews for a spot
export const getAllReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadAll(reviews))
  };
};

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

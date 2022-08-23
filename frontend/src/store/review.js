import { csrfFetch } from "./csrf";

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


// Thunks Section

// Get all reviews for a spot
export const getAllReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews');

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadAll(reviews))
  };
};

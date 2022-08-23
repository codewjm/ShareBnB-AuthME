import { csrfFetch } from './csrf';

// Actions Section - CRUD
const LOAD_ALL_SPOTS = 'spots/getAllSpots'; // Read
const CREATE_SPOT = 'spots/createSpot'; // Create
const LOAD_SPOT = 'spots/getSpot'; // Read
const UPDATE_SPOT = 'spots/updateSpot'; // Update
const DELETE_SPOT = 'spots/deleteSpot'; // Delete

//Action Creators Section
const loadAll = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  };
};

const createOne = (newSpotData) => {
  return {
    type: CREATE_SPOT,
    newSpotData
  };
};

const loadOne = (spotData) => {
  return {
    type: LOAD_SPOT,
    spotData
  };
};

const updateOne = (spotData) => {
  return {
    type: UPDATE_SPOT,
    spotData
  };
};

const removeOne = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};


// Thunks Section

// Gat all spots
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadAll(spots));
  };
};


// Create a spot
export const createSpot = (newSpotData) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpotData)
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createOne(newSpot));
  };
};


// Get one spot by Id
export const getSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadOne(spot));
  };
};


// Update a spot by Id
export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData)
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateOne(spot));
  };
};

// Delete a spot by Id
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    dispatch(removeOne(spotId))
  };
};

// Reducer Section
let initialState = {};
const spotsReducer = (state = initialState, action) => {

};

export default spotsReducer;

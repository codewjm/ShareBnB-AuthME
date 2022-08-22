import { csrfFetch } from './csrf';

// Actions
const LOAD_ALL_SPOTS = 'spots/getAllSpots';
const CREATE_SPOT = 'spots/createSpot';
const LOAD_SPOT = 'spots/getSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

//Action Creators
const loadAll = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  };
};

const create = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot
  };
};

const load = (spot) => {
  return {
    type: LOAD_SPOT,
    spot
  };
};

const update = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  };
};

const remove = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

// Action Creators
export const getAllSpots = (spots) => async (dispatch) {
  const res = await fetch('/api/spots')

  if(res.ok) {
    const spots = await res.json();
    dispatch(loadAll(spots))
  }
}





// Thunks



// Reducer

import { csrfFetch } from './csrf';

// Actions Section - CRUD
const LOAD_ALL_SPOTS = 'spots/getAllSpots'; // Read
const LOAD_OWNER_SPOTS = 'spots/getOwnerSpots'; // Read
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

const loadOwner = (spots) => {
  return {
    type: LOAD_OWNER_SPOTS,
    spots
  }
}

const createOne = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot
  };
};

const loadOne = (spot) => {
  return {
    type: LOAD_SPOT,
    spot
  };
};

const updateOne = (updateSpot) => {
  return {
    type: UPDATE_SPOT,
    updateSpot
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
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const spots = await res.json();
    console.log(spots)
    dispatch(loadAll(spots.Spots));
  };
};

// Get all spots owned by current user
export const getOwnerSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const ownerSpots = await res.json();
    dispatch(loadOwner(ownerSpots));
  }
}


// Create a spot
export const createSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpot)
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createOne(newSpot));
  };
  return res
};


// Get one spot by Id
export const getSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadOne(spot));
  };
};


// Update a spot by Id
export const updateSpot = (spotId, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateOne(spot));
  };
};

// Delete a spot by Id
export const deleteSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeOne(spotId))
  };
};

// Reducer Section
let initialState = {};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS: {
      const newState = { ...state }
      action.spots.forEach((spot) => {
        newState[spot.id] = spot
      });
      return newState ;
    }
    case LOAD_OWNER_SPOTS: {
      const newState = { ...state }
      action.spots.forEach((spot) => {
        newState[spot.id] = spot
      });
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state };
      newState[action.newSpot.id] = action.newSpot;
      return newState;
    }
    case LOAD_SPOT: {
      const newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case UPDATE_SPOT: {
      const newState = { ...state };
      newState[action.updateSpot.id] = action.updateSpot;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  };
};

export default spotsReducer;

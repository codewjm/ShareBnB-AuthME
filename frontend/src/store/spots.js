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
    // console.log(spots)
    dispatch(loadAll(spots.Spots));
  };
};

// Get all spots owned by current user
export const getOwnerSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const ownerSpots = await res.json();
    // console.log("getOwnerSpots thunk:", ownerSpots)
    dispatch(loadOwner(ownerSpots));
  }
}


// Create a spot
export const createSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSpot)
  }) // add a cacth for an error message

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createOne(newSpot));
    return newSpot
  };
  // return res
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
  })

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
let initialState = {userSpots: []};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS: {
      const newState = { ...state }
      action.spots.forEach((spot) => {
        newState[spot.id] = spot
      });

//!!!!!!!!!!! Creates a res.json() problem in console
// not allowing use to create a spot from the splashpage
// but will allow from the my listings page
// likely due to the deletion of the userSpots key/array
// thats my suspicion but I have had multiple people look at this
// and absolutely nobodu can figure it out. I've poured into stackoverflow
// a solution and when we take away this code below, my skeleton spot card
// issue comes back. Solve one, break the other.

      // if(newState.userSpots) {
      //   delete newState.userSpots
      // }

      // console.log("getAllSpots new state---", newState)
      return newState ;
    }
    case LOAD_OWNER_SPOTS: {
      const newState = { ...state }
      // console.log("Load owners reducer:", action.spots.Spots)
      newState.userSpots = action.spots.Spots
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state };

      // newState[action.newSpot.id] = action.newSpot;
      // newState.userSpots[action.newSpot.id] = action.newSpot;
      // newState.userSpots.push(action.newSpot)
      return newState;
    }
    case LOAD_SPOT: {
      const newState = { ...state };
      // console.log("OnLoad spot",  newState)
      newState[action.spot.id] = action.spot;
      // console.log("Loaded spot",  newState)
      return newState;
    }
    case UPDATE_SPOT: {
      const copyState = { ...state };
      // console.log("Before Updating State",  state)
      copyState[action.updateSpot.id] = {...copyState[action.updateSpot.id], ...action.updateSpot}
      // console.log("After Updating State",  copyState)

      return copyState;
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

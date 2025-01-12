import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sourceCoordinates: { long: 0, lat: 0 },
  destinationCoordinates: { long: 0, lat: 0 },
  userLocation: { long: 0, lat: 0 },
  destinationRoute: [],
  amount: 0,
  pickUpAdd: "",
  dropAdd: "",
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setSourceCoordinates: (state, actions) => {
      state.sourceCoordinates = actions.payload;
    },
    setDestinationCoordinates: (state, actions) => {
      state.destinationCoordinates = actions.payload;
    },
    setUserLocations: (state, actions) => {
      state.userLocation = actions.payload;
    },
    setDestinationRoute: (state, actions) => {
      state.destinationRoute = actions.payload;
    },
    setCarAmount: (state, actions) => {
    console.log(actions.payload)
      state.amount = actions.payload;
    },
    setPickup: (state, actions) => {
      state.pickUpAdd = actions.payload;
    },
    setDrop: (state, actions) => {
      state.dropAdd = actions.payload;
    },
  },
});

export const {
  setDestinationCoordinates,
  setSourceCoordinates,
  setUserLocations,
  setDestinationRoute,
  setCarAmount,
  setDrop,
  setPickup,
} = coordinatesSlice.actions;

export default coordinatesSlice.reducer;

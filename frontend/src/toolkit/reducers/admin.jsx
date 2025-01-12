import { createSlice } from "@reduxjs/toolkit";
import {
  allDriverFetch,
  analyticsData,
  allBookedRides,
} from "../thunk/dataThunk";

const initialState = {
  isLoading: true,
  drivers: [],
  analyticsData: [],
  allBookedRides: [],
  totalPage: 0,
  totalBookingPage: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allDriverFetch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allDriverFetch.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.drivers = action.payload.drivers),
          (state.totalPage = action.payload.totalPage);
      })
      .addCase(allDriverFetch.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(analyticsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(analyticsData.fulfilled, (state, actions) => {
        (state.isLoading = false), (state.analyticsData = actions.payload);
      })
      .addCase(analyticsData.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(allBookedRides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allBookedRides.fulfilled, (state, actions) => {
        (state.isLoading = false),
          (state.allBookedRides = actions.payload.bookings);
        state.totalBookingPage = actions.payload.totalPage;
      });
  },
});

export default dataSlice.reducer;

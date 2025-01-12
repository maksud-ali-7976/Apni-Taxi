import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const allDriverFetch = createAsyncThunk(
  "data/allDriver",
  async ({ page, limit, search, vehicleType: vehicleType }) => {
    const res = await axios.get(
      `${BackendUrl}admin/all-driver?page=${page}&limit=${limit}&search=${search}&vehicleType=${vehicleType}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);

export const analyticsData = createAsyncThunk("data/analytics", async () => {
  const res = await axios.get(`${BackendUrl}admin/analytics`, {
    withCredentials: true,
  });
  return res.data.data;
});

export const allBookedRides = createAsyncThunk(
  "data/booked-rides",
  async ({ page, limit }) => {
    const res = await axios.get(
      `${BackendUrl}booking/all-booked?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);

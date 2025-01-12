import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, logOut } from "../reducers/User";
import toast from "react-hot-toast";
import axios from "axios";
import { replace } from "react-router-dom";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const userSignup = createAsyncThunk(
  "auth/signup",
  async ({ userInfo, navigate }, thunkAPI) => {
    try {
      const res = await axios.post(`${BackendUrl}user/signup`, userInfo, {
        withCredentials: true,
      });
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        thunkAPI.dispatch(setAuth(res.data.user));
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ userInfo, navigate }, thunkAPi) => {
    const res = await axios.post(`${BackendUrl}user/signin`, userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success == false) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      thunkAPi.dispatch(setAuth(res.data.user));
      res.data.user.role == "admin" ? navigate("/admin",{replace:true}) : navigate("/");
    }
  }
);

export const EmailVerifyThunk = createAsyncThunk(
  "auth/verify-email",
  async ({ otpInfo, navigate }, thunkAPI) => {
    try {
      const res = await axios.post(`${BackendUrl}user/verify-email`, otpInfo, {
        withCredentials: true,
      });
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        thunkAPI.dispatch(setAuth(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPi) => {
    try {
      const res = await axios.get(`${BackendUrl}user/checkAuth`, {
        withCredentials: true,
      });
      thunkAPi.dispatch(setAuth(res.data.user));
    } catch (error) {
      thunkAPi.dispatch(logOut());
      throw error;
    }
  }
);
export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BackendUrl}user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        thunkAPI.dispatch(logOut());
      }
    } catch (error) {
      throw error;
    }
  }
);

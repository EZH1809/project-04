import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectAccessToken } from '../auth/selectors.js';

axios.defaults.baseURL = 'https://back-end-aquatrack.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const addWaterAmount = createAsyncThunk(
  'water/addWaterAmount',
  async ([waterData, token], thunkAPI) => {
    try {
      setAuthHeader(token);
      const response = await axios.post('/water', waterData);
      // console.log('Response from server:', response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // console.error('Unauthorized: Token may be invalid or expired');
        // } else {
        //   console.error('Error adding water:', error.response?.data  error.message);
      }
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateWaterAmount = createAsyncThunk(
  'water/updateWaterAmount',
  async ([id, waterItem, token], thunkAPI) => {
    try {
      if (token) {
        setAuthHeader(token);
      }
      const { data } = await axios.patch(`/water/${id}`, waterItem);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async ({ id, token }, thunkAPI) => {
    try {
      if (token) {
        setAuthHeader(token);
      }
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      // console.error('Error deleting water entry:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchWaterDataByDay = createAsyncThunk(
  'water/fetchWaterDataByDay',
  async ({ date }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = selectAccessToken(state);
    setAuthHeader(token);
    try {
      const response = await axios.get(`/water/day/${date}`);
      return response.data;
    } catch (error) {
      // console.error('Error fetching water data:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

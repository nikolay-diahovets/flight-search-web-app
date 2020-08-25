import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  flightsData: {},
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    getFlightsSuccess: {
      reducer: (state, { payload }) => {
        return {
          ...state,
          flightsData: payload,
          error: null,
        };
      },
      prepare: (flights) => ({ payload: flights })
    },
    setFlightsLoading: {
      reducer: (state, { payload }) => {
        return {
          ...state,
          loading: payload,
        }
      },
      prepare: (loading) => ({ payload: loading })
    },
    getFlightsFailed: {
      reducer: (state, { payload }) => {
        return {
          ...state,
          flightsData: {},
          error: payload,
        }
      },
      prepare: (error) => ({ payload: error })
    }
  }
});

export const flights = flightsSlice.reducer;
export const { getFlightsSuccess, getFlightsFailed, setFlightsLoading } = flightsSlice.actions;

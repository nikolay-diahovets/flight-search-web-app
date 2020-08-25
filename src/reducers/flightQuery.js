import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const flightQuerySlice = createSlice({
  name: "flightQuery",
  initialState,
  reducers: {
    setFlightQuery: {
      reducer: (state, { payload }) => {
        return payload;
      },
      prepare: (flightQueryObj) => ({ payload: flightQueryObj })
    },
  }
});

export const flightQuery = flightQuerySlice.reducer;
export const { setFlightQuery } = flightQuerySlice.actions;

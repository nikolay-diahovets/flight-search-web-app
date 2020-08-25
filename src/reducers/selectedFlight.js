import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight: null
};

const selectedFlightSlice = createSlice({
  name: "selectedFlight",
  initialState,
  reducers: {
    setSelectedFlight: {
      reducer: (state, { payload }) => {
        return {
          flight: payload,
        };
      },
      prepare: (flight) => ({ payload: flight })
    },
  }
});

export const selectedFlight = selectedFlightSlice.reducer;
export const { setSelectedFlight } = selectedFlightSlice.actions;

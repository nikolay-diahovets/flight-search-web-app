import { combineReducers } from "redux";
import { flights } from "./flights";
import { flightQuery } from "./flightQuery";
import { selectedFlight } from "./selectedFlight";

export const rootReducer = combineReducers({
  flights,
  flightQuery,
  selectedFlight,
});

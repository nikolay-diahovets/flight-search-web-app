import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedFlight } from "../reducers/selectedFlight";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { Flights } from "./Flights";

import styles from "./Leg.module.scss";
import { scrollToTop } from "../utils/scrollToTop";
import { ROUTES } from "../routes";

export const Leg = ({ leg, hideBookBtn }) => {
  const { directions, itinerary, cost } = leg;
  const { inFlights, outFlights, inStops, outStops } = itinerary;
  const { price } = cost;

  const dispatch = useDispatch();
  const history = useHistory();

  const onBook = () => {
    dispatch(setSelectedFlight(leg));
    history.push(ROUTES.CHECKOUT_PAGE);
    scrollToTop();
  };

  return (
    <Card elevation={4}>
      <CardContent className="pb-0">
        <Typography
          className="font-weight-bold"
          variant="h5"
          component="p"
        >
          Directions: {directions}
        </Typography>
      </CardContent>
      <Divider className="mt-2 mb-2"/>
      <CardContent className="pt-0">
        <Flights flightsDirectionTitle="Out flights" flightsData={outFlights}
                 stops={outStops}/>
        <Flights flightsDirectionTitle="In flights" flightsData={inFlights}
                 stops={inStops}/>
        <CardActions className="justify-content-between">
          {
            !hideBookBtn && (
              <Button
                onClick={onBook}
                variant="contained"
                color="primary"
              >
                Book
              </Button>
            )
          }
          <Paper className={styles.price} elevation={2}>Cost: ${price}</Paper>
        </CardActions>
      </CardContent>
    </Card>
  );
};

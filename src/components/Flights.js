import React from "react";
import moment from "moment";
import styles from "./Flights.module.scss";
import { Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import classNames from "classnames";

export const Flights = ({ flightsDirectionTitle, flightsData, stops }) => {
  return (
    <div>
      <div className={styles.flights}>{flightsDirectionTitle}</div>
      {
        flightsData?.map((outFlight, i) => {
          const {
            originAirportFullName,
            originAirportCode,
            destinationAirportFullName,
            destinationAirportCode,
            leaving,
            arriving,
            duration,
            carrierImage,
            carrierFullName,
            arriveDateTime,
            departDateTime,
          } = outFlight;

          const departDate = moment(departDateTime).format('MMMM Do YYYY');
          const arriveDate = moment(arriveDateTime).format('MMMM Do YYYY');

          return (
            <Paper key={i} elevation={2} className={styles.cardContainer}>
              <div className={classNames(styles.carrierAndLogoContainer, "mb-2")}>
                <img src={carrierImage} alt="carrier"/>
                <div className={styles.carrierName}>Carrier: {carrierFullName}</div>
              </div>
              <div>
                <div>
                  <div className={styles.directionContainer}>
                    <div>
                      <div>From: {originAirportFullName} ({originAirportCode})</div>
                      <div>Leaving: {leaving}</div>
                    </div>
                    <div>
                      <div>Depart date: {departDate}</div>
                    </div>
                  </div>
                  <Divider className="mt-2 mb-1"/>
                  <div className={styles.directionContainer}>
                    <div>
                      <div>To: {destinationAirportFullName} ({destinationAirportCode})</div>
                      <div>Arriving: {arriving}</div>
                    </div>
                    <div>
                      <div>Arrive date: {arriveDate}</div>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
              <Divider className="mt-2 mb-1"/>
              <div>
                <div>Duration: {duration} minutes</div>
                <div>Stops: {stops}</div>
              </div>
            </Paper>
          );
        })
      }
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';

import { Col, Container, Row } from "react-bootstrap";

import { getFlightsFailed, getFlightsSuccess, setFlightsLoading } from "../reducers/flights";
import { FlightsSortBySelect } from "./form/formComponents/FlightsSortBySelect";
import { getCarrierFilters } from "../utils/getCarrierFilters";
import { getStopFilters } from "../utils/getStopFilters";
import { FlightFilter } from "./form/formComponents/FlightFilter";
import { getFlights } from "../api/getFlights";
import { Leg } from "./Leg";

import styles from "./Legs.module.scss";

const flightsOrderByOptions = [
  { value: "price", label: "Price" },
  { value: "best", label: "Best" },
  { value: "duration", label: "Duration" },
  { value: "stops", label: "Stops" },
];

// Route segments
export const Legs = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ filterStops: [], filterAirlines: [] });
  const [sortBy, setSortBy] = useState("price");

  const { flightsData, loading } = useSelector((state) => state.flights);
  const flightQuery = useSelector((state) => state.flightQuery);
  const { totalPages, legs, availableStopFilters, carriers } = flightsData;

  const dispatch = useDispatch();

  const requestFlights = async (page, sortBy, filter) => {
    const queryObject = {
      ...flightQuery,
      page,
      sortBy,
      filter: JSON.stringify(filter),
    };

    dispatch(setFlightsLoading(true));

    try {
      const result = await getFlights(queryObject);
      dispatch(getFlightsSuccess(result));
    } catch (e) {
      dispatch(getFlightsFailed(e));
    }

    dispatch(setFlightsLoading(false));
  };

  const handlePageChange = (event, page) => {
    setPage(page);

    requestFlights(page, sortBy, filter);
  };

  const handleOrderByChange = (sortBy) => {
    setSortBy(sortBy);
    setPage(1);
    requestFlights(1, sortBy, filter);
  };

  const handleStopFilterChange = (stops) => {
    const newFilter = { ...filter, filterStops: stops };
    setPage(1);
    requestFlights(1, sortBy, newFilter);
    setFilter(newFilter);
  };

  const handleCarrierFiltersChange = (carriers) => {
    const newFilter = { ...filter, filterAirlines: carriers };
    setPage(1);
    requestFlights(1, sortBy, newFilter);
    setFilter(newFilter);
  };

  return (
    <Container>
      <Row className="w-100">
        <Col xs={12}>
          <Row>
            <Col xs={3}>
              <FlightsSortBySelect
                name="orderBy"
                onChange={handleOrderByChange}
                label="Order by"
                options={flightsOrderByOptions}
              />
              <FlightFilter
                label="Stops"
                filters={getStopFilters(availableStopFilters)}
                onChange={handleStopFilterChange}
              />
              <FlightFilter
                label="Carriers"
                filters={getCarrierFilters(carriers)}
                onChange={handleCarrierFiltersChange}
              />
            </Col>
            <Col xs={9}>
              {
                !loading ?
                  (
                    legs?.length ?
                      (
                        <>
                          <div>
                            {legs?.map((leg, i) => {
                              return (
                                <div key={i} className={styles.cardContainer}>
                                  <Leg leg={leg}/>
                                </div>
                              );
                            })}
                          </div>

                          <div className="d-flex justify-content-center m-4">
                            <Pagination
                              count={totalPages}
                              page={page}
                              variant="outlined"
                              onChange={handlePageChange}
                            />
                          </div>
                        </>
                      )
                      :
                      (
                        <Paper className={styles.noResults} elevation={3}>No results</Paper>
                      )
                  )
                  :
                  (
                    <Paper elevation={3} className="d-flex justify-content-center p-5">
                      <CircularProgress/>
                    </Paper>
                  )
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

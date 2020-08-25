import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';

import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../../api/getFlights";
import { getFlightsFailed, getFlightsSuccess, setFlightsLoading } from "../../reducers/flights";
import { setFlightQuery } from "../../reducers/flightQuery";

import { FormikTextField } from "../form/formComponents/FormikTextField";
import { FormikDateField } from "../form/formComponents/FormikDateField";
import { FormikNumberField } from "../form/formComponents/FormikNumberField";

import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { Row, Col } from "react-bootstrap";

import styles from "./HomePage.module.scss";
import { homeValidationSchema } from "../form/formikValidation/validationSchemas";
import { scrollToTop } from "../../utils/scrollToTop";
import { ROUTES } from "../../routes";

const maxNumberOfPeople = 9;

export const HomePage = () => {
  const [initialValues] = useState({
    origin: "PIT",
    destination: "EWR",
    leaveDate: "2020-12-12",
    returnDate: "2020-12-14",
    numberOfAdults: 1,
    numberOfChildren: 0,
  });
  const { loading } = useSelector((state) => state.flights);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchFlights = async (flightFormValues) => {
    const queryObject = {
      ...flightFormValues,
      page: 1,
      orderBy: "price",
    };

    dispatch(setFlightsLoading(true));

    try {
      const result = await getFlights(queryObject);
      dispatch(getFlightsSuccess(result));
      history.push(ROUTES.RESULTS_PAGE);
      scrollToTop();
    } catch (e) {
      dispatch(getFlightsFailed(e));
      alert(e);
      console.error(e);
    }

    dispatch(setFlightsLoading(false));
  };

  const onSubmit = async (values) => {
    await fetchFlights(values);
    dispatch(setFlightQuery(values));
  };

  return (
    <Paper elevation={3} className={styles.formContainer}>
      <Formik initialValues={initialValues} validationSchema={homeValidationSchema} onSubmit={onSubmit}>
        {
          (props) => {
            const { values, isSubmitting } = props;
            const { numberOfAdults, numberOfChildren } = values;

            const maxChildren = maxNumberOfPeople - numberOfAdults;
            const maxAdults = maxNumberOfPeople - numberOfChildren;

            return (
              <Form>
                <Row>
                  <Col>
                    <FormikTextField
                      label="From"
                      name="origin"
                      placeholder="Airport code"
                    />
                  </Col>
                  <Col>
                    <FormikTextField
                      label="To"
                      name="destination"
                      placeholder="Airport code"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FormikDateField
                      label="Departure"
                      name="leaveDate"
                    />
                  </Col>
                  <Col>
                    <FormikDateField
                      label="Return"
                      name="returnDate"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <FormikNumberField
                      name="numberOfAdults"
                      label="Adults (18+)"
                      min={1}
                      max={maxAdults}
                    />
                  </Col>
                  <Col>
                    <FormikNumberField
                      name="numberOfChildren"
                      label="Children (0-17)"
                      min={0}
                      max={maxChildren}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                      { loading ? "Loading..." : "Show flights" }
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }
        }
      </Formik>
    </Paper>
  );
};

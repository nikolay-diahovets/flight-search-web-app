import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Formik, Form } from 'formik';
import { FormikTextField } from "../form/formComponents/FormikTextField";
import { FormikRadioField } from "../form/formComponents/FormikRadioFiled";
import { FormikEmailField } from "../form/formComponents/FormikEmailField";

import Paper from "@material-ui/core/Paper";

import { Col, Container, Row } from "react-bootstrap";
import { Leg } from "../Leg";

import styles from "./CheckoutPage.module.scss";
import { FormikDateField } from "../form/formComponents/FormikDateField";

import { FormikPhoneField } from "../form/formComponents/FormikPhoneField";
import { checkoutValidationSchema } from "../form/formikValidation/validationSchemas";
import { Button } from "@material-ui/core";
import { scrollToTop } from "../../utils/scrollToTop";
import { Header } from "../Header";

export const CheckoutPage = () => {
  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    dateOfBirth: "",
  });

  const { flight } = useSelector((state) => state.selectedFlight);
  const history = useHistory();

  const backToResultsPage = () => {
    history.push("/results");
    scrollToTop();
  };

  const onSubmit = (values, { resetForm }) => {
    alert("Success!");
    resetForm();
  };

  return (
    <div>
      <Header title="Checkout page" handleBackBtn={backToResultsPage}/>
      <Container>
        <Row className="justify-content-center">
          <Col xs={9}>
            {flight && <Leg leg={flight} hideBookBtn/>}
          </Col>
        </Row>
      </Container>

      <Container className="mt-4 mb-4">
        <Row className="justify-content-center">
          <Col xs={9}>
            <Paper elevation={3} className={styles.formContainer}>
              <Formik initialValues={initialValues} validationSchema={checkoutValidationSchema} onSubmit={onSubmit}>
                {(props) => {
                  const { isSubmitting } = props;

                  return (
                    <Form>
                      <Row>
                        <Col>
                          <FormikTextField
                            label="First name"
                            name="firstName"
                            placeholder="First name"
                          />
                        </Col>
                        <Col>
                          <FormikTextField
                            label="Last name"
                            name="lastName"
                            placeholder="Last name"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <FormikRadioField
                            label="Gender"
                            name="gender"
                            radioButtons={[
                              { label: "Male", value: "male" },
                              { label: "Female", value: "female" },
                            ]}
                          />
                        </Col>
                        <Col>
                          <FormikDateField
                            label="Date of Birth"
                            name="dateOfBirth"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormikEmailField
                            label="Email"
                            name="email"
                            placeholder="Email"
                          />
                        </Col>
                        <Col>
                          <FormikPhoneField
                            label="Phone"
                            name="phone"
                            placeholder="Phone"
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Paper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

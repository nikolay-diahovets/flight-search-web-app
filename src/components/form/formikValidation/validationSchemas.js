import * as Yup from "yup";
import moment from "moment";

const requiredString = Yup.string().required("Field can't be empty.");
const requiredNumber = Yup.number().required("Field can't be empty.");
const requireDate = Yup.string().test("validate date", "Invalid Date", (date) => {
  const tempDate = moment(new Date(date));
  return tempDate.isValid();
});

const requireDateOfBirth = Yup.string().test("validate date of birth", "Invalid Date of Birth", (date) => {
  const inputDate = new Date(date);
  const currentDate = new Date();

  const tempDate = moment(new Date(date));
  const isValid = tempDate.isValid();

  return isValid && currentDate > inputDate;
});

const requireEmail = Yup.string().email("Not valid email.").required("Field can't be empty.");

export const homeValidationSchema = Yup.object().shape({
  origin: requiredString,
  destination: requiredString,
  leaveDate: requireDate,
  returnDate: requireDate,
  numberOfAdults: requiredNumber,
  numberOfChildren: requiredNumber,
});

export const checkoutValidationSchema = Yup.object().shape({
  firstName: requiredString,
  lastName: requiredString,
  gender: requiredString,
  phone: requiredString,
  email: requireEmail,
  dateOfBirth: requireDateOfBirth,
});

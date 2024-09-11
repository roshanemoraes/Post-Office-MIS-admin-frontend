import { Last } from "react-bootstrap/esm/PageItem";
import * as yup from "yup";

//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const contactnoRule = /^0\d{9}$/;
const basicSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("Please enter a valid email").required("Required"),
  /*password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .max(16)
    .required("Required"),*/
  address: yup.string(),
  contact: yup
    .string()
    .matches(
      contactnoRule,
      "Contact number must be 10 digits and start with 0"
    ),
});

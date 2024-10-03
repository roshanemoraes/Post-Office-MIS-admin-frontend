import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// Yup validation schema
export const basicSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  address: yup.string().required("Address is required"),
  contact: yup
    .string()
    .matches(/^0\d{9}$/, "Contact number must be 10 digits and start with 0")
    .required("Contact number is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("District is required"),
});

const onSubmit = async (values, actions) => {
  console.log(values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export default function UpdateProfile() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contact: "",
      city: "",
      state: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const handleCancel = () => {
    formik.resetForm(); // This will reset the form fields to the initial values
  };

  return (
    <>
      <div className="flex justify-center bg-#a3a3a3 py-10">
        <div className="w-full max-w-[600px] bg-white p-8 rounded-md border-2 border-gray-300">
          <div className="text-2xl font-semibold text-center text-black mb-6">
            Update Profile
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-gray-700 text-sm">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-2 px-3 py-2 border-2 rounded-md text-lg w-full ${
                      formik.errors.fullName && formik.touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.fullName && formik.touched.fullName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                </div>
                {/*<div className="flex flex-col w-1/2">
                  <label className="font-semibold text-gray-700 text-sm">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-2 px-3 py-2 border-2 rounded-md text-lg ${
                      formik.errors.lastName && formik.touched.lastName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.lastName && formik.touched.lastName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                //</div> */}
              </div>
            </div>

            {/*<div className="mb-6">
              <label className="font-semibold text-gray-700 text-sm">
                Email
              </label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-2 px-3 py-2 border-2 rounded-md text-lg w-full ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>*/}

            <div className="mb-6">
              <label className="font-semibold text-gray-700 text-sm">
                Address
              </label>
              <input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-2 px-3 py-2 border-2 rounded-md text-lg w-full ${
                  formik.errors.address && formik.touched.address
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.address && formik.touched.address ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>

            <div className="mb-6">
              <label className="font-semibold text-gray-700 text-sm">
                Contact Number
              </label>
              <input
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-2 px-3 py-2 border-2 rounded-md text-lg w-full ${
                  formik.errors.contact && formik.touched.contact
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.errors.contact && formik.touched.contact ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.contact}
                </div>
              ) : null}
            </div>

            {/*<div className="mb-6">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-gray-700 text-sm">
                    City
                  </label>
                  <input
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-2 px-3 py-2 border-2 rounded-md text-lg ${
                      formik.errors.city && formik.touched.city
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.city && formik.touched.city ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.city}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="font-semibold text-gray-700 text-sm">
                    District
                  </label>
                  <input
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-2 px-3 py-2 border-2 rounded-md text-lg ${
                      formik.errors.state && formik.touched.state
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {formik.errors.state && formik.touched.state ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.state}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>*/}

            <div className="flex justify-between mt-8 text-xl">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-gray-700 bg-white rounded-md border-2 border-gray-700 hover:bg-red-900 hover:text-red transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 font-semibold text-white bg-blue-900 rounded-md hover:bg-red-900 transition-colors duration-300"
                disabled={formik.isSubmitting}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="min-h-[90px]"></div>
    </>
  );
}

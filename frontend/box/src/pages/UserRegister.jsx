import { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../redux/Auth/auth.action";
import { Button, TextField } from "@mui/material";
import * as Yup from 'yup';
import PacmanLoader from "react-spinners/PacmanLoader";
import {useNavigate} from "react-router";

// Define the validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required").matches(/^\d{10}$/, "Must be a valid phone number"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const initialValues = { name: "", phone: "", email: "", password: "" };

const UserRegister = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
        // console.log("User", user);
        if (token) {
          navigate("/");
        }
  }, [token, navigate]);


  const onSubmitHandler = async(values) => {
    const data = dispatch(registerUserAction({ data: values }));
  }   


  return (
    
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="min-h-[100vh] flex justify-center items-center">
          {loading?(<div className=""><PacmanLoader color="#5f6fff" /></div>):(
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white">
              <p className="text-2xl font-semibold">
                Create Account
              </p>
              <p>
                Please sign up
                appointment
              </p>
                  <div className="w-full">
                    <p>Full Name</p>
                    <Field
                      as={TextField}
                      name="name"
                      placeholder="Full Name"
                      type="text"
                      variant="outlined"
                      fullWidth
                      className="mt-1 bg-white"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-full">
                    <p>Phone</p>
                    <Field
                      as={TextField}
                      name="phone"
                      placeholder="Phone"
                      type="text"
                      variant="outlined"
                      fullWidth
                      className="mt-1 bg-white"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
               
              <div className="w-full">
                <p>Email</p>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  className="mt-1 bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-full">
                <p>Password</p>
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  className="mt-1 bg-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Button
                type="submit"
                sx={{ padding: ".8rem 0rem" }}
                variant="contained"
                color="primary"
                fullWidth
              >
                 Create Account
              </Button>
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-primary underline cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
            </div>
          )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserRegister;

import { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../redux/Auth/auth.action";
import { Button, TextField } from "@mui/material";
import * as Yup from 'yup';
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

// Define the validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const initialValues = { email: "", password: "" };



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading, token} = useSelector((state) => state.auth);

  // console.log(logginUser,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  const onSubmitHandler = async (values) => {

    const data = await dispatch(loginUserAction({ data: values }));
  }

    useEffect(() => {
      // console.log("User", user);
      if (token) {
        navigate("/dashboard");
      }
    }, [token, navigate]);

    
  return (
    <><Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="min-h-[80vh] flex justify-center items-center">
            {loading ? (<div className=""><PacmanLoader color="#5f6fff" /></div>) : (
              <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">
                </p>
                <p>
                  Please Register to book
                  appointment
                </p>
                <div className="w-full">
                  <p>Email</p>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    className="mt-1" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500" />
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
                    className="mt-1" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500" />
                </div>

                <Button
                  type="submit"
                  sx={{ padding: ".8rem 0rem" }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>


                <p>
                  Create an new account?{" "}
                  <span
                    onClick={() => navigate("/user-register")}
                    className="text-primary underline cursor-pointer"
                  >
                    Click here
                  </span>
                </p>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik></>
  );
};

export default Login;

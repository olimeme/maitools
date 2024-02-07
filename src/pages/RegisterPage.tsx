import React, { useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import AuthService from "../services/AuthService";
import useCustomToast from "../hooks/useCustomToast";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const customToast = useCustomToast();
  const navigate = useNavigate();

  const validate = (values: RegisterData) => {
    const errors: FormikErrors<RegisterData> = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password has to contain at least 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleRegisterSuccessful = () => {
    customToast("User registered successfuly!", "", "success");
    navigate(-1);
  };

  const handleRegisterFailed = (errorMessage: string | undefined) => {
    customToast("Error occured", errorMessage || "An error occured.", "error");
  };

  const handleOnSubmit = (values: RegisterData) => {
    setLoading(true);
    AuthService.register(values)
      .then((data) => handleRegisterSuccessful())
      .catch((error) => handleRegisterFailed(error.message))
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "normal",
    },
    validate,
    onSubmit: handleOnSubmit,
  });

  return (
    <MotionWrapper>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        verticalAlign={"middle"}
        height={"70vh"}
      >
        <form onSubmit={formik.handleSubmit}>
          <VStack w={"sm"}>
            <Center mb={4}>
              <Heading size={"2xl"}>Register</Heading>
            </Center>
            <FormControl
              isInvalid={!!formik.errors.fullName && formik.touched.fullName}
            >
              <Input
                placeholder="Full name"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                id="fullName"
                name="fullName"
                disabled={loading}
              />
              <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <Input
                placeholder="E-mail"
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                disabled={loading}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <Input
                placeholder="Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                name="password"
                disabled={loading}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.errors.confirmPassword &&
                formik.touched.confirmPassword
              }
            >
              <Input
                placeholder="Confirm password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
                disabled={loading}
              />
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>
            <Button w={"full"} type={"submit"}>
              Register
            </Button>
            <Button
              as={Link}
              w={"full"}
              variant={"link"}
              to="/login"
              p={2}
              isLoading={loading}
            >
              Already have an account?
            </Button>
          </VStack>
        </form>
      </Flex>
    </MotionWrapper>
  );
};

export default RegisterPage;

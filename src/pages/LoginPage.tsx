import React, { useEffect, useState } from "react";
import MotionWrapper from "../components/MotionWrapper";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, FormikErrors, useFormik } from "formik";
import useCustomToast from "../hooks/useCustomToast";
import AuthService, { LoginData } from "../services/AuthService";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const customToast = useCustomToast();
  const navigate = useNavigate();
  const validate = (values: LoginData) => {
    const errors: FormikErrors<LoginData> = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleLoginSuccessful = () => {
    customToast("Welcome!", "You have been logged in.", "success");
    navigate(-1);
  };

  const handleLoginFailed = (errorMessage: string | undefined) => {
    customToast("Error occured", errorMessage || "An error occured.", "error");
  };
  const handleOnSubmit = (values: LoginData) => {
    setLoading(true);
    AuthService.login(values)
      .then((data) => handleLoginSuccessful())
      .catch((error) => handleLoginFailed(error.message))
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
          <VStack w={"sm"} spacing={2}>
            <Center mb={4}>
              <Heading size={"2xl"}>Login</Heading>
            </Center>
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
            <Button w={"full"} type={"submit"} isLoading={loading}>
              Login
            </Button>
            <Button
              as={Link}
              w={"full"}
              variant={"link"}
              to="/register"
              p={2}
              isLoading={loading}
            >
              Sign up
            </Button>
          </VStack>
        </form>
      </Flex>
    </MotionWrapper>
  );
};

export default LoginPage;

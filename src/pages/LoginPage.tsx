import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, FormikErrors, useFormik } from "formik";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
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
    } else if (values.password.length < 8) {
      errors.password = "Password has to contain at least 8 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button w={"full"} type={"submit"}>
              Login
            </Button>
            <Button as={Link} w={"full"} variant={"link"} to="/register" p={2}>
              Sign up
            </Button>
          </VStack>
        </form>
      </Flex>
    </MotionWrapper>
  );
};

export default LoginPage;

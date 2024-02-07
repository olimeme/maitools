import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

interface NotAuthenticatedProps {
  children: React.ReactNode;
}

const CheckAuth = ({ children }: NotAuthenticatedProps) => {
  return (
    <>
      {AuthService.isLoggedIn() ? (
        children
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} h={"50vh"}>
          <VStack>
            <Heading size={"lg"}>To use this feature please login</Heading>
            <Button as={Link} to={"/login"}>
              Login
            </Button>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default CheckAuth;

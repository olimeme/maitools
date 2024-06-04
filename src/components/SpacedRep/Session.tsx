import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";

const Session = () => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    console.log(id);
  }, []);
  return (
    <MotionWrapper>
      <Heading>Session id: {id}</Heading>
    </MotionWrapper>
  );
};

export default Session;

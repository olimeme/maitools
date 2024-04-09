import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import MotionWrapper from "../MotionWrapper";

const SpaceRepSession = () => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    console.log(id);
  }, []);
  return (
    <MotionWrapper>
      <Heading>Space Rep Session</Heading>
    </MotionWrapper>
  );
};

export default SpaceRepSession;

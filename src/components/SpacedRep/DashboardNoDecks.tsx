import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const DashboardNoDecks = () => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
      h={"30vh"}
    >
      <Heading as="h1" size="lg">
        No Decks Found
      </Heading>
      <Text>You can create a new deck by clicking the "Add Deck" button.</Text>
    </Flex>
  );
};

export default DashboardNoDecks;

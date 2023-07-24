import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Heading,
  Spacer,
  Text,
  UseDisclosureProps,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React from "react";
import { drawerItems } from "../../data/drawerItems";
import DrawerItem from "./DrawerItem";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationDrawer = ({ isOpen, onClose }: NavigationDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      closeOnEsc
      closeOnOverlayClick
    >
      <DrawerOverlay />
      <DrawerContent p={4}>
        <Heading mb={4}>Tools</Heading>
        {drawerItems.map(({ link, name }) => (
          <DrawerItem link={link} mb={2} onClose={onClose}>
            <Flex>
              <Text>{name}</Text>
              <Spacer />
              <ArrowForwardIcon mt={1} />
            </Flex>
          </DrawerItem>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationDrawer;

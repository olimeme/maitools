import {
  Box,
  Card,
  CardBody,
  ChakraProps,
  ChakraStyledOptions,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface DrawerItemProp extends ChakraProps {
  children?: React.ReactNode;
  onClose: () => void;
  link: string;
}

const DrawerItem = ({ children, link, onClose, ...props }: DrawerItemProp) => {
  return (
    <Link to={link} onClick={onClose}>
      <Card size={"sm"} {...props}>
        <CardBody>{children}</CardBody>
      </Card>
    </Link>
  );
};

export default DrawerItem;

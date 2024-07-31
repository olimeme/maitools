import {
  Box,
  Card,
  CardBody,
  ChakraStyledOptions,
  Heading,
} from "@chakra-ui/react";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

export interface CardComponentProps extends ChakraStyledOptions {
  variant?: "Front" | "Back";
}

const CardComponent = ({ variant, style, ...rest }: CardComponentProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();

  return (
    <Card shadow={"lg"}>
      <CardBody
        minH={"sm"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        {...rest}
      >
        {variant === "Front" ? (
          <Heading as={"h1"}>{rest.front}</Heading>
        ) : (
          <Heading as={"h1"}>{rest.back}</Heading>
        )}
      </CardBody>
    </Card>
  );
};

export default CardComponent;

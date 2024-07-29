import { Box, ChakraStyledOptions, Heading } from "@chakra-ui/react";

export interface CardComponentProps extends ChakraStyledOptions {
  variant?: "Front" | "Back";
}

const CardComponent = ({ variant, style, ...rest }: CardComponentProps) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={variant === "Front" ? "cyan.600" : "pink.200"}
      {...rest}
    >
      {variant === "Front" ? "Front Side" : "Back Side"}
    </Box>
  );
};

export default CardComponent;

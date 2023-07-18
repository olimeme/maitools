import { Button, ButtonProps } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface BackButtonProps extends ButtonProps {}

const BackButton = ({ ...props }: BackButtonProps) => {
  return (
    <Link to="/">
      <Button variant="ghost" mb={4} leftIcon={<ArrowBackIcon />} {...props}>
        Back
      </Button>
    </Link>
  );
};

export default BackButton;

import { Button, ButtonProps } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface BackButtonProps extends ButtonProps {
  to?: string;
}

const BackButton = ({ to, ...props }: BackButtonProps) => {
  return (
    <Link to={to ?? "/"}>
      <Button variant="ghost" mb={4} leftIcon={<ArrowBackIcon />} {...props}>
        Back
      </Button>
    </Link>
  );
};

export default BackButton;

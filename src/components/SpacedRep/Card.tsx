import { Heading } from "@chakra-ui/react";

interface CardComponentProps {
  variant: "Front" | "Back";
  style?: React.CSSProperties;
}

const CardComponent = ({ variant, style }: CardComponentProps) => {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: variant === "Front" ? "lightblue" : "lightcoral",
      }}
    >
      {variant === "Front" ? "Front Side" : "Back Side"}
    </div>
  );
};

export default CardComponent;

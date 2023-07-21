import { Textarea, TextareaProps } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React from "react";

export const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return (
    <Textarea
      variant={"filled"}
      minH="unset"
      overflow="hidden"
      w="100%"
      size={"lg"}
      resize="none"
      ref={ref}
      minRows={25}
      as={ResizeTextarea}
      {...props}
    />
  );
});

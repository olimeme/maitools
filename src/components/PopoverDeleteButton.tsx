import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React from "react";

interface PopoverDeleteButtonProps extends UseDisclosureProps {
  handleDelete: () => void;
}

const PopoverDeleteButton = ({
  handleDelete,
  ...rest
}: PopoverDeleteButtonProps) => {
  return (
    <Popover {...rest} closeOnEsc>
      <PopoverTrigger>
        <IconButton
          size={"xs"}
          aria-label="delete"
          colorScheme="red"
          icon={<DeleteIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
        <PopoverBody>
          <Button colorScheme="red" mr={2} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant={"ghost"} onClick={rest.onClose}>
            Cancel
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDeleteButton;

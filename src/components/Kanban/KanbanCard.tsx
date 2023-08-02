import { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IKanbanCard } from "../../interfaces/Kanban";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useColorMode,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import useContextMenu from "../../hooks/useContextMenu";

interface KanbanCardProps extends IKanbanCard {
  //   draggableId: string;
  cardIndex: number;
}

const KanbanCard = ({
  id,
  text,
  // desc,
  // label,
  // dueDate,
  // status,
  cardIndex,
}: KanbanCardProps) => {
  const { clicked, setClicked } = useContextMenu();

  return (
    <>
      <Draggable key={id} draggableId={id.toString()} index={cardIndex}>
        {(provided) => (
          <Menu isOpen={clicked} placement="auto">
            <MenuButton
              as={Card}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              mt={2}
              borderRadius={"xl"}
              onContextMenu={(e) => {
                e.preventDefault();
                setClicked(true);
              }}
            >
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
              <CardBody p={4}>
                <Heading size="sm">{text}</Heading>
                {/* {desc && (
                <Text fontSize={"sm"} mt={1} color={"gray"}>
                {desc?.length > 60 ? `${desc?.slice(0, 60)}...` : desc}{" "}
                </Text>
              )} */}
                {/* <Text>{status}</Text> */}
              </CardBody>
            </MenuButton>
          </Menu>
        )}
      </Draggable>
    </>
  );
};

export default KanbanCard;

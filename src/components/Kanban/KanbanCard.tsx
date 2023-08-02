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
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import useContextMenu from "../../hooks/useContextMenu";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useKanbanBoardContext } from "../../contexts/KanbanBoardCardHandlersContext";
import { KanbanBoardColumns } from "./KanbanBoard";

interface KanbanCardProps extends IKanbanCard {
  //   draggableId: string;
  columnId: string;
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
  columnId,
}: KanbanCardProps) => {
  const { handleEditCard, handleDeleteCard } = useKanbanBoardContext();
  return (
    <>
      <Draggable key={id} draggableId={id.toString()} index={cardIndex}>
        {(provided) => (
          <Menu placement="auto">
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              mt={2}
              borderRadius={"xl"}
            >
              <CardBody p={4}>
                <Flex>
                  <Heading size="sm">{text}</Heading>
                  {/* {desc && (
                  <Text fontSize={"sm"} mt={1} color={"gray"}>
                  {desc?.length > 60 ? `${desc?.slice(0, 60)}...` : desc}{" "}
                  </Text>
                )} */}
                  {/* <Text>{status}</Text> */}
                  <Spacer />
                  <MenuButton
                    as={IconButton}
                    size={"xs"}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                  />
                </Flex>
              </CardBody>
              <MenuList>
                <MenuItem onClick={() => handleEditCard(id, columnId)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeleteCard(id, columnId)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Card>
          </Menu>
        )}
      </Draggable>
    </>
  );
};

export default KanbanCard;

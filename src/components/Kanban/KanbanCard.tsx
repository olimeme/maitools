import { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IKanbanCard } from "../../interfaces/Kanban";
import {
  Card,
  CardBody,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Spacer,
  IconButton,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import useContextMenu from "../../hooks/useContextMenu";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useKanbanBoardContext } from "../../contexts/KanbanBoardContext";
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
  const {
    handleEditCard,
    handleDeleteCard,
    focusCardOnMount,
    setFocusCardOnMount,
  } = useKanbanBoardContext();

  useEffect(() => {
    setFocusCardOnMount(true);
  }, []);

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
                  <Editable
                    defaultValue={text}
                    onSubmit={(newString) =>
                      handleEditCard(id, columnId, newString)
                    }
                    size={"sm"}
                    isPreviewFocusable={true}
                    startWithEditView={focusCardOnMount}
                  >
                    <EditablePreview as={Heading} size={"xs"} w={"100%"} />
                    <EditableInput p={0} placeholder="Enter name" />
                  </Editable>
                  {/* {desc && (
                  <Text fontSize={"sm"} mt={1} color={"gray"}>
                  {desc?.length > 60 ? `${desc?.slice(0, 60)}...` : desc}{" "}
                  </Text>
                )} */}
                  {/* <Text>{status}</Text> */}
                  <Spacer />
                  <MenuButton
                    mt={1}
                    as={IconButton}
                    size={"xs"}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                  />
                </Flex>
              </CardBody>
              <MenuList borderRadius={"xl"}>
                {/* <MenuItem onClick={} icon={<EditIcon />}>
                  Edit
                </MenuItem> */}
                <MenuItem
                  onClick={() => handleDeleteCard(id, columnId)}
                  icon={<DeleteIcon />}
                >
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

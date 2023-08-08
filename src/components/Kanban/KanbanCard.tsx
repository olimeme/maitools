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
  useEditableControls,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useKanbanBoardContext } from "../../contexts/KanbanBoardContext";

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

  function EditableControls() {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <></>
    ) : (
      <MenuItem {...getEditButtonProps()} icon={<EditIcon />}>
        Edit
      </MenuItem>
    );
  }

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
              <Editable
                defaultValue={text}
                width="full"
                size={"sm"}
                startWithEditView={focusCardOnMount}
                onSubmit={(newString) =>
                  handleEditCard(id, columnId, newString)
                }
                isPreviewFocusable={false}
              >
                <CardBody p={4}>
                  <Flex>
                    <EditablePreview as={Heading} size={"xs"} width="full" />
                    <EditableInput />
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
                  <EditableControls />
                  <MenuItem
                    onClick={() => handleDeleteCard(id, columnId)}
                    icon={<DeleteIcon />}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Editable>
            </Card>
          </Menu>
        )}
      </Draggable>
    </>
  );
};

export default KanbanCard;

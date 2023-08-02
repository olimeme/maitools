import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanCard from "./KanbanCard";
import { IKanbanCard } from "../../interfaces/Kanban";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import PopoverConfirmation from "../PopoverConfirmation";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { KanbanBoardColumns } from "./KanbanBoard";

interface KanbanColumnProps {
  column: KanbanBoardColumns;
  changeColorBasedOnTheme: (
    darkModeColor: string,
    lightModeColor: string
  ) => string;
  handleColumnTitleChange: (columnId: string, newName: string) => void;
  deleteColumn: (columnId: string) => void;
  addCard: (columnItem: KanbanBoardColumns) => void;
}

const KanbanColumn = ({
  column,
  changeColorBasedOnTheme,
  handleColumnTitleChange,
  deleteColumn,
  addCard,
}: KanbanColumnProps) => {
  const columnObj = Object.entries(column);
  const [[columnId, { name, items }]] = columnObj;
  return (
    <Flex key={columnId} flexDirection={"column"} px={4} width={"xs"}>
      <Flex>
        <Editable
          mb={2}
          defaultValue={name}
          fontSize={"2xl"}
          onSubmit={(value) => handleColumnTitleChange(columnId, value)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Spacer />
        <PopoverConfirmation
          button={
            <IconButton
              size={"sm"}
              aria-label="Delete column"
              variant={"ghost"}
              icon={<DeleteIcon />}
              mt={1}
            />
          }
          onConfirm={() => deleteColumn(columnId)}
        />
      </Flex>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <VStack
            {...provided.droppableProps}
            ref={provided.innerRef}
            align={"stretch"}
            bgColor={
              snapshot.isDraggingOver
                ? changeColorBasedOnTheme("whiteAlpha.200", "gray.100")
                : ""
            }
            transition={"0.3s ease-in-out"}
            borderRadius={"xl"}
            py={1}
            px={2}
          >
            {items.map((item, idx) => (
              <KanbanCard key={item.id} {...item} cardIndex={idx} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
      <IconButton
        mt={2}
        aria-label="Add card"
        icon={<AddIcon />}
        onClick={() => addCard({ [columnId]: { name, items } })}
        variant={"ghost"}
        borderRadius={"xl"}
      ></IconButton>
    </Flex>
  );
};

export default KanbanColumn;

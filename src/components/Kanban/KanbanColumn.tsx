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
  Text,
  VStack,
} from "@chakra-ui/react";

interface KanbanColumnProps {
  items: IKanbanCard[];
  columnName: string;
  droppableId: string;
  type: string;
}

const KanbanColumn = ({
  items,
  columnName,
  droppableId,
  type,
}: KanbanColumnProps) => {
  return (
    <Flex flexDirection={"column"} px={4} width={"xs"}>
      <Editable mb={2} defaultValue={columnName} fontSize={"2xl"}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Droppable droppableId={droppableId} type={type}>
        {(provided, snapshot) => (
          <VStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            align={"stretch"}
            minHeight={"40rem"}
          >
            {items.map((item, idx) => (
              <KanbanCard key={idx} {...item} cardIndex={idx} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </Flex>
  );
};

export default KanbanColumn;

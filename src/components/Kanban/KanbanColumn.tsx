import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanCard from "./KanbanCard";
import { IKanbanCard } from "../../interfaces/Kanban";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface KanbanColumnProps {
  items: IKanbanCard[];
  columnName: string | React.ReactNode;
}

const KanbanColumn = ({ items, columnName }: KanbanColumnProps) => {
  return (
    <Flex flexDirection={"column"} px={4}>
      <Text mb={2}>{columnName}</Text>
      <Droppable droppableId="droppable-1" type="PERSON">
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, idx) => (
              <KanbanCard key={idx} {...item} cardIndex={idx} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Flex>
  );
};

export default KanbanColumn;

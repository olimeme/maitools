import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IKanbanCard } from "../../interfaces/Kanban";
import { Box, Card, Heading, Text, useColorMode } from "@chakra-ui/react";

interface KanbanCardProps extends IKanbanCard {
  //   draggableId: string;
  cardIndex: number;
}

const KanbanCard = ({
  id,
  text,
  label,
  dueDate,
  status,
  cardIndex,
}: KanbanCardProps) => {
  const { colorMode } = useColorMode();
  return (
    <Draggable key={id} draggableId={id.toString()} index={cardIndex}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          p={2}
          mt={2}
          maxW="sm"
          bg={colorMode === "dark" ? "#2e2e2e" : "white"}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading size="sm">{text}</Heading>
          <Text>{status}</Text>
        </Box>
      )}
    </Draggable>
  );
};

export default KanbanCard;

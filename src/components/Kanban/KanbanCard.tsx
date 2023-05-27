import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IKanbanCard } from "../../interfaces/Kanban";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface KanbanCardProps extends IKanbanCard {
  //   draggableId: string;
  cardIndex: number;
}

const KanbanCard = ({
  id,
  text,
  desc,
  label,
  dueDate,
  status,
  cardIndex,
}: KanbanCardProps) => {
  return (
    <Draggable key={id} draggableId={id.toString()} index={cardIndex}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          mt={2}
        >
          <CardBody p={4}>
            <Heading size="sm">{text}</Heading>
            {desc && (
              <Text fontSize={"sm"} mt={1} color={"gray"}>
                {desc?.length > 60 ? `${desc?.slice(0, 60)}...` : desc}{" "}
              </Text>
            )}
            {/* <Text>{status}</Text> */}
          </CardBody>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;

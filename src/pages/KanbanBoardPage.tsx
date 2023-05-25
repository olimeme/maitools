import { useState, useEffect, useCallback } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Flex, Heading } from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { KanbanColumn } from "../components/Kanban";
import { IKanbanCard } from "../interfaces/Kanban";
import { DropResult } from "react-beautiful-dnd";

const KanbanBoardPage = () => {
  const [mockItems, setMockItems] = useState([
    {
      id: 1,
      text: "to do something nice",
      status: 1,
    },
    {
      id: 2,
      text: "Code",
      status: 1,
    },
    {
      id: 3,
      text: "Do some shit",
      status: 1,
    },
    {
      id: 4,
      text: "Nice item",
      status: 1,
    },
  ]);

  const onBeforeDragStart = useCallback(() => {
    /*...*/
    console.log("Drag before start");
  }, []);

  const onDragStart = useCallback(() => {
    /*...*/
    console.log("Drag start");
  }, []);
  const onDragUpdate = useCallback(() => {
    console.log("Drag updated");
    /*...*/
  }, []);
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(result);
    if (!result.destination) return;

    const newItems = Array.from(mockItems);
    const [reOrdered] = newItems.splice(source.index, 1);
    newItems.splice(destination!.index, 0, reOrdered);
    setMockItems(newItems);
  };

  return (
    <MotionWrapper>
      <Heading mb={4} textAlign={"center"}>
        Kanban board
      </Heading>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Flex>
          <KanbanColumn columnName="Planned" items={mockItems} />
        </Flex>
      </DragDropContext>
    </MotionWrapper>
  );
};

export default KanbanBoardPage;

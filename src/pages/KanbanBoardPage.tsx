import { useState, useEffect, useCallback } from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Heading } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const KanbanBoardPage = () => {
  useEffect(() => {}, []);

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
  const onDragEnd = useCallback(() => {
    // the only one that is required
    console.log("Drag ended");
  }, []);

  return (
    <MotionWrapper>
      <Heading mb={8} textAlign={"center"}>
        Kanban board
      </Heading>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="droppable-1" type="PERSON">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
              }}
              {...provided.droppableProps}
            >
              <h2>I am a droppable!</h2>
              <Draggable draggableId="draggable-1" index={0}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h4>My draggable</h4>
                  </div>
                )}
              </Draggable>
              <Draggable draggableId="draggable-2" index={1}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <h4>My draggable</h4>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </MotionWrapper>
  );
};

export default KanbanBoardPage;

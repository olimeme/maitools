import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { Flex, VStack } from "@chakra-ui/layout";
import KanbanCard from "./KanbanCard";
import IKanbanCard from "../../interfaces/Kanban/IKanbanCard.js";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { v4 as uuidv4 } from "uuid";

const itemsFromBackend: IKanbanCard[] = [
  {
    id: 1,
    text: "to do something nice",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, eaque fugiat quasi iusto reprehenderit in aut, officiis delectus cum vitae molestiae laudantium nam saepe quidem ad magnam. Officia, quod a.",
    status: 1,
  },
  {
    id: 2,
    text: "Code",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, eaque fugiat quasi iusto reprehenderit in aut, officiis delectus cum vitae molestiae laudantium nam saepe quidem ad magnam. Officia, quod a.",
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
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Planned",
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: "In progress",
    items: [],
  },
  [uuidv4()]: {
    name: "Finished",
    items: [],
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const copiedItems = [...sourceColumn.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Flex>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Flex key={id} flexDirection={"column"} px={4} width={"xs"}>
              <Editable mb={2} defaultValue={column.name} fontSize={"2xl"}>
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Droppable droppableId={id}>
                {(provided, snapshot) => (
                  <VStack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    align={"stretch"}
                    minHeight={"40rem"}
                  >
                    {column.items.map((item, idx) => (
                      <KanbanCard key={idx} {...item} cardIndex={idx} />
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </Flex>
          );
        })}
      </Flex>
    </DragDropContext>
  );
};

export default KanbanBoard;

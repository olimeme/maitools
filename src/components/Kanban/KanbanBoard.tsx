import React, { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { Flex, VStack } from "@chakra-ui/layout";
import IKanbanCard from "../../interfaces/Kanban/IKanbanCard.js";
import { v4 as uuidv4 } from "uuid";
import { getInitialStateFromLocalStorage } from "../../helpers/getInitialStateFromLocalStorage";
import { IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import KanbanColumn from "./KanbanColumn";
import { KanbanBoardContext } from "../../contexts/KanbanBoardContext";

export interface KanbanBoardColumns {
  [x: string]: {
    name: string;
    items: IKanbanCard[];
  };
}

const itemsFromBackend: IKanbanCard[] = [
  {
    id: 1,
    text: "to do something nice",
    // desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, eaque fugiat quasi iusto reprehenderit in aut, officiis delectus cum vitae molestiae laudantium nam saepe quidem ad magnam. Officia, quod a.",
    // status: 1,
  },
  {
    id: 2,
    text: "Code",
    // desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est, eaque fugiat quasi iusto reprehenderit in aut, officiis delectus cum vitae molestiae laudantium nam saepe quidem ad magnam. Officia, quod a.",
    // status: 1,
  },
  {
    id: 3,
    text: "Do some shit",
    // status: 1,
  },
  {
    id: 4,
    text: "Nice item",
    // status: 1,
  },
];

const columnsFromBackend: KanbanBoardColumns = {
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
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const [columns, setColumns] = useState(() =>
    getInitialStateFromLocalStorage("kanbanBoardColumns", columnsFromBackend)
  );
  const [focusCardOnMount, setFocusCardOnMount] = useState<boolean>(false);

  useEffect(() => {
    saveCardDrag();
  }, [columns]);

  const saveCardDrag = (): void => {
    localStorage.setItem("kanbanBoardColumns", JSON.stringify(columns));
  };

  const addColumn = (): void => {
    const newColumns = { ...columns };
    newColumns[uuidv4()] = { name: "New column", items: [] };
    setFocusCardOnMount(true);
    setColumns(newColumns);
  };

  const deleteColumn = (columnId: string): void => {
    const newColumns = { ...columns };
    delete newColumns[columnId];
    setColumns(newColumns);
  };

  const addCard = (columnItem: KanbanBoardColumns): void => {
    const column = Object.entries(columnItem);
    const [[columnId, { name, items }]] = column;
    items.push({ id: uuidv4(), text: "New item" });
    const newColumns = { ...columns, [columnId]: { name, items } };
    setFocusCardOnMount(true);
    setColumns(newColumns);
  };

  const onDragEnd = (result: DropResult): void => {
    setFocusCardOnMount(false);
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

  const handleColumnTitleChange = (columnId: string, newName: string): void => {
    const newColumns = { ...columns };
    newColumns[columnId].name = newName;
    setColumns(newColumns);
  };

  const handleEditCard = (
    cardId: IKanbanCard["id"],
    columnId: string,
    newString: string
  ) => {
    const newColumns = { ...columns };
    const editedCardColumn = newColumns[columnId].items.map((card) => {
      if (card.id === cardId) card.text = newString;
      return card;
    });
    const result = {
      ...newColumns,
      [columnId]: { items: editedCardColumn, name: newColumns[columnId].name },
    };
    setColumns(result);
  };

  const handleDeleteCard = (cardId: IKanbanCard["id"], columnId: string) => {
    const newColumns = { ...columns };
    const deletedCardColumn = newColumns[columnId].items.filter(
      (card) => card.id !== cardId
    );
    const result = {
      ...newColumns,
      [columnId]: { items: deletedCardColumn, name: newColumns[columnId].name },
    };
    setColumns(result);
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        handleEditCard,
        handleDeleteCard,
        focusCardOnMount,
        setFocusCardOnMount,
      }}
    >
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Flex>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <KanbanColumn
                key={id}
                column={{ [id]: column }}
                changeColorBasedOnTheme={changeColorBasedOnTheme}
                handleColumnTitleChange={handleColumnTitleChange}
                deleteColumn={deleteColumn}
                addCard={addCard}
              />
            );
          })}
          <Flex flexDirection={"column"} px={4} width={"xs"}>
            <IconButton
              aria-label="Add column"
              icon={<AddIcon />}
              onClick={addColumn}
              variant={"ghost"}
              borderRadius={"xl"}
            ></IconButton>
          </Flex>
        </Flex>
      </DragDropContext>
    </KanbanBoardContext.Provider>
  );
};

export default KanbanBoard;

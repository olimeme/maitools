import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Container,
  Divider,
  Flex,
  List,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { useState, useRef, useEffect } from "react";
import {
  ChakraComponent,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  useOutsideClick,
  useToast,
  Kbd,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { getInitialStateFromLocalStorage } from "../../helpers/getInitialStateFromLocalStorage";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import TodoList from "./TodoList";
import { TodoListItemContext } from "../../contexts/TodoListItemContext";
import useCommandHistory from "../../hooks/useCommandHistory";

export interface ITodoListItem {
  id: number | string;
  taskName: string;
  // dueDate: Date;
}

const todoListItemsFromBackend: ITodoListItem[] = [
  {
    id: uuidv4(),
    taskName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolore consequuntur nihil reprehenderit quia ex nesciunt dolorum autem! Dicta architecto tempora voluptatibus ullam nostrum aliquid cum eligendi temporibus provident id?",
  },
  {
    id: uuidv4(),
    taskName: "Lorem ipsum dolor?",
  },
  {
    id: uuidv4(),
    taskName: "Lorem ipsum dolor cum eligendi temporibus provident id?",
  },
  {
    id: uuidv4(),
    taskName: "Lorem ipsum id?",
  },
];

const ToastUndoMessage = () => {
  return (
    <Text>
      Undo <Kbd>ctrl</Kbd> + <Kbd>z</Kbd>
    </Text>
  );
};

const TodoListContent = () => {
  const [todoListItems, setTodoListItems] = useState<ITodoListItem[]>(() =>
    getInitialStateFromLocalStorage<ITodoListItem[]>(
      "todoListItems",
      todoListItemsFromBackend
    )
  );
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { registerAction, clearHistory } = useCommandHistory();

  useOutsideClick({
    ref: ref,
    handler: () => handleClearTaskNameInput(),
  });

  useEffect(() => {
    saveTaskList();
  }, [todoListItems]);

  const hasError = (str: string) => {
    if (str.length > 300) return true;
    return false;
  };

  const saveTaskList = (): void => {
    localStorage.setItem("todoListItems", JSON.stringify(todoListItems));
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasError(taskName) || taskName.length === 0) return;
    const taskList = [...todoListItems];
    const newTask: ITodoListItem = { id: uuidv4(), taskName: taskName };
    taskList.push(newTask);
    setTodoListItems(taskList);
    clearHistory();
    setTaskName("");
  };

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 300) {
      setErrorMessage(
        "Task name cannot have over 300 characters: " +
          `${e.target.value.length}/300`
      );
    }
    if (!hasError(e.target.value)) setErrorMessage("");
    setTaskName(e.target.value);
  };

  const handleClearTaskNameInput = () => {
    setTaskName("");
    setAddingTask(false);
  };

  const handleCheckTask = (task: ITodoListItem) => {
    const { item, index } = todoListItems
      .map((item, index) => ({ item, index }))
      .find(({ item }) => item.id === task.id) || { item: null, index: -1 };

    if (!item || index === -1) return;
    const arr = [...todoListItems];
    arr.splice(index, 1);

    setTodoListItems(arr);
    registerAction(
      () => setTodoListItems(arr),
      () => {
        arr.splice(index, 0, item);
        setTodoListItems([...arr]);
        toast({
          title: "Undone!",
          status: "warning",
          position: "bottom-right",
          isClosable: true,
          duration: 1000,
        });
      }
    );

    toast({
      title: "Task is complete!",
      description: <ToastUndoMessage />,
      status: "success",
      position: "bottom-right",
      isClosable: true,
    });
  };

  return (
    <Container maxW={"md"}>
      <Text color={"gray"}>Tasks for today: {todoListItems.length}</Text>
      <Divider my={2} />
      <TodoListItemContext.Provider value={{ handleCheckTask }}>
        <TodoList items={todoListItems} />
      </TodoListItemContext.Provider>
      {addingTask ? (
        <form onSubmit={handleAddTask}>
          <FormControl isInvalid={!!errorMessage}>
            <Input
              type="text"
              placeholder="Task name"
              variant={"filled"}
              mt={2}
              borderRadius={"lg"}
              autoFocus
              value={taskName}
              ref={ref}
              onChange={handleChangeInputValue}
            />
            {!!errorMessage && (
              <FormErrorMessage>{errorMessage}.</FormErrorMessage>
            )}
          </FormControl>
        </form>
      ) : (
        <Button
          variant={"ghost"}
          leftIcon={<AddIcon />}
          w={"full"}
          mt={2}
          onClick={() => setAddingTask(true)}
        >
          Add Task
        </Button>
      )}
    </Container>
  );
};

export default TodoListContent;

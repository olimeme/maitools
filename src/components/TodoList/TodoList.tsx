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
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { getInitialStateFromLocalStorage } from "../../helpers/getInitialStateFromLocalStorage";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";

interface ITodoListItem {
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

const TodoList = () => {
  const [todoListItems, setTodoListItems] = useState<ITodoListItem[]>(() =>
    getInitialStateFromLocalStorage("todoListItems", todoListItemsFromBackend)
  );
  const [addingTask, setAddingTask] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const { changeColorBasedOnTheme } = useDarkModeChecker();

  useOutsideClick({
    ref: ref,
    handler: () => handleClearTaskNameInput(),
  });

  const hasError = (str: string) => {
    if (str.length > 300) return true;
    return false;
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasError(taskName) || taskName.length === 0) return;
    const taskList = [...todoListItems];
    taskList.push({ id: uuidv4(), taskName: taskName });
    setTodoListItems(taskList);
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

  return (
    <Container>
      <Flex>
        <Text color={"gray"}>Tasks for today: 0</Text>
        <Spacer />
        <Text color={"gray"}>Finished tasks: 0</Text>
      </Flex>
      <Divider my={2} />
      <List>
        {todoListItems.map(({ id, taskName }) => (
          <div key={id}>
            <ListItem key={id}>
              <Checkbox
                w="full"
                p={2}
                transition={"0.2s ease-in-out"}
                borderRadius={"lg"}
                _hover={{
                  background: changeColorBasedOnTheme(
                    "whiteAlpha.200",
                    "gray.100"
                  ),
                }}
              >
                {taskName}
              </Checkbox>
            </ListItem>
            <Divider my={2} />
          </div>
        ))}
      </List>
      {addingTask ? (
        <form onSubmit={handleAddTask}>
          <FormControl isInvalid={!!errorMessage}>
            <Input
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

export default TodoList;

import { Checkbox } from "@chakra-ui/checkbox";
import { Divider, List, ListItem } from "@chakra-ui/layout";
import React from "react";
import { ITodoListItem } from "./TodoListContent";
import { useDarkModeChecker } from "../../hooks/useDarkModeChecker";
import {
  useToast,
  Text,
  Kbd,
  useDisclosure,
  ScaleFade,
  Box,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTodoListItemContext } from "../../contexts/TodoListItemContext";
import { CheckIcon } from "@chakra-ui/icons";

interface TodoListProps {
  items: ITodoListItem[];
}

const TodoList = ({ items }: TodoListProps) => {
  const { changeColorBasedOnTheme } = useDarkModeChecker();
  const { handleCheckTask } = useTodoListItemContext();
  return (
    <List>
      <AnimatePresence mode={"popLayout"}>
        {items.map(({ id, taskName }) => (
          <motion.li
            layout
            key={id}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <Checkbox
              aria-label={taskName}
              p={2}
              spacing="1rem"
              borderRadius={"lg"}
              w={"full"}
              onChange={() => handleCheckTask({ id, taskName })}
              _hover={{
                background: changeColorBasedOnTheme(
                  "whiteAlpha.200",
                  "gray.100"
                ),
              }}
            >
              <Text overflowWrap={"anywhere"}>{taskName}</Text>
            </Checkbox>
            <Divider my={2} />
          </motion.li>
        ))}
      </AnimatePresence>
    </List>
  );
};

export default TodoList;

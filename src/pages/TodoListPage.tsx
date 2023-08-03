import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Heading } from "@chakra-ui/react";
import { TodoList } from "../components/TodoList";

const TodoListPage = () => {
  return (
    <MotionWrapper>
      <TodoList />
    </MotionWrapper>
  );
};

export default TodoListPage;

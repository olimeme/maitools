import React from "react";
import MotionWrapper from "../components/MotionWrapper";
import { Heading } from "@chakra-ui/react";
import { TodoListContent } from "../components/TodoList";

const TodoListPage = () => {
  return (
    <MotionWrapper>
      <TodoListContent />
    </MotionWrapper>
  );
};

export default TodoListPage;

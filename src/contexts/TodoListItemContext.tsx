import { createContext, useContext } from "react";
import { ITodoListItem } from "../components/TodoList/TodoListContent";

interface TodoListItemContextType {
  handleCheckTask: (task: ITodoListItem) => void;
}

export const TodoListItemContext = createContext<TodoListItemContextType>({
  handleCheckTask: () => {},
});

export function useTodoListItemContext() {
  return useContext(TodoListItemContext);
}

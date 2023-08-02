import { createContext, useContext } from "react";
import { IKanbanCard } from "../interfaces/Kanban";
import { KanbanBoardColumns } from "../components/Kanban/KanbanBoard";

interface KanbanBoardContextType {
  handleEditCard: (cardId: IKanbanCard["id"], columnId: string) => void;
  handleDeleteCard: (cardId: IKanbanCard["id"], columnId: string) => void;
}

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  handleEditCard: () => {},
  handleDeleteCard: () => {},
});

export function useKanbanBoardContext() {
  return useContext(KanbanBoardContext);
}

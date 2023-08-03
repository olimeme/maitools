import { createContext, useContext } from "react";
import { IKanbanCard } from "../interfaces/Kanban";
import { KanbanBoardColumns } from "../components/Kanban/KanbanBoard";

interface KanbanBoardContextType {
  handleEditCard: (
    cardId: IKanbanCard["id"],
    columnId: string,
    newString: string
  ) => void;
  handleDeleteCard: (cardId: IKanbanCard["id"], columnId: string) => void;
  focusCardOnMount: boolean;
  setFocusCardOnMount: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  handleEditCard: () => {},
  handleDeleteCard: () => {},
  focusCardOnMount: false,
  setFocusCardOnMount: () => {},
});

export function useKanbanBoardContext() {
  return useContext(KanbanBoardContext);
}

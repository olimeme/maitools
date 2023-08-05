import { useEffect, useState } from "react";

type Action = () => void;

interface HistoryItem {
  action: Action;
  undoFunction: Action;
}

const useCommandHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const registerAction = (action: Action, undoFunction: Action) => {
    setHistory((prevHistory) => [...prevHistory, { action, undoFunction }]);
  };

  const undoLastAction = () => {
    const lastAction = history.pop();
    if (lastAction) {
      lastAction.undoFunction();
      setHistory([...history]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const handleUndoShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        undoLastAction();
      }
    };

    window.addEventListener("keydown", handleUndoShortcut);

    return () => {
      window.removeEventListener("keydown", handleUndoShortcut);
    };
  }, [history]);

  return { registerAction, clearHistory };
};

export default useCommandHistory;

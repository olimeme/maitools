import { useEffect, useState } from "react";
import Mousetrap from "mousetrap";

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
    Mousetrap.bind("mod+z", function () {
      undoLastAction();
    });
  }, [history]);

  return { registerAction, clearHistory };
};

export default useCommandHistory;

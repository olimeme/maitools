export const getInitialStateFromLocalStorage = (
  key: string,
  defaultValue: number | boolean
): number | boolean => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};

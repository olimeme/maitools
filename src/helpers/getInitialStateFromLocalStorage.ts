export const getInitialStateFromLocalStorage = <T>(
  key: string,
  defaultValue: T
): T => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null &&
    storedValue !== undefined &&
    storedValue !== "undefined"
    ? JSON.parse(storedValue)
    : defaultValue;
};

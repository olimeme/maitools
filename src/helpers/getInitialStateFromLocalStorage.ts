export const getInitialStateFromLocalStorage = (
  key: string,
  defaultValue: number | boolean | string
): number | boolean | string => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null &&
    storedValue !== "undefined" &&
    storedValue !== undefined &&
    !storedValue
    ? JSON.parse(storedValue)
    : defaultValue;
};

export const errorHandler = (error: any): string => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const addDataFromReduxStateToLocalStorage = (
  key: string,
  accessStore: () => void
): void => {
  localStorage.setItem(key, JSON.stringify(accessStore()));
};

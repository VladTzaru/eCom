export const errorHandler = (error: any): string => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const addDataFromReduxStateToLocalStorage = (
  key: string,
  accessStore: () => void
): void => localStorage.setItem(key, JSON.stringify(accessStore()));

export const addDataToLocalStorage = (key: string, data: any): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const getDataFromLocalStorage = (key: string, fallBackValue: any) =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '{}')
    : fallBackValue;

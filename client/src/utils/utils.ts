import { CartProductI } from '../customTypes';

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

export const showTotalCartItemsQuantity = (items: CartProductI[]): number =>
  items.reduce((acc: number, item: CartProductI) => acc + item.quantity, 0);

export const calculateTotalCartItemsPrice = (items: CartProductI[]): number =>
  Number(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  );

export const calculateShippingCost = (
  totalProductPrice: number
): number | string => (totalProductPrice > 100 ? 'Free shipping' : 30);

export const calculateTax = (rate: number, totalProductPrice: number): number =>
  Number(((rate / 100) * totalProductPrice).toFixed(2));

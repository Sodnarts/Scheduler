import { Timestamp } from 'firebase/firestore';
import { ShoppingCartItem } from '../pages/shopping-cart/ShoppingCart';
import { Household } from '../types/Household';

const endShoppingTrip = (
  household: Household,
  list: ShoppingCartItem[],
  price: string,
  shoppedBy: string,
  startTime: number
) => {
  household.shoppingList = list
    .filter((l) => !l.selected)
    .map((l) => {
      return { name: l.name, quantity: l.quantity - l.quantityBought };
    });
  household.receipts = [...household.receipts, generateReceipt(list, price, shoppedBy, startTime)];

  return household;
};

const generateReceipt = (list: ShoppingCartItem[], price: string, shoppedBy: string, startTime: number) => {
  return {
    price: price,
    items: [
      ...list
        .filter((l) => l.quantityBought > 0 || l.selected)
        .map((l) => {
          return { name: l.name, quantity: l.selected ? l.quantityBought + 1 : l.quantityBought };
        }),
    ],
    date: Timestamp.now(),
    shoppedBy,
    duration: Math.floor((new Date().getTime() - startTime) / 1000),
  };
};

export { endShoppingTrip };

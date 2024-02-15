import { ShoppingListItem } from '../types/Household';

const formatShoppingList = (shoppingList: ShoppingListItem[]) => {
  const list = [...shoppingList];
  const trimmedList = list.filter((item) => item.name.length);
  return removeDuplicates(trimmedList);
};

const removeDuplicates = (shoppingList: ShoppingListItem[]) => {
  const list = [...shoppingList];

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      list[j].name === list[i].name && i !== j && list[i].quantity++ && list.splice(j, 1);
    }
  }

  return list;
};

export { formatShoppingList };

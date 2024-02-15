import { Household } from '../types/Household';
import { getMonday } from './getMonday';

export const createHouseholdObject = (id: string, name: string, address: string, userId: string): Household => {
  return {
    id,
    name: name,
    address: address,
    members: [userId],
    shoppingList: [],
    receipts: [],
    weeklyMenu: {
      startDate: getMonday().getTime(),
      weekOne: [
        { day: 0, menuItem: '' },
        { day: 1, menuItem: '' },
        { day: 2, menuItem: '' },
        { day: 3, menuItem: '' },
        { day: 4, menuItem: '' },
        { day: 5, menuItem: '' },
        { day: 6, menuItem: '' },
      ],
      weekTwo: [
        { day: 0, menuItem: '' },
        { day: 1, menuItem: '' },
        { day: 2, menuItem: '' },
        { day: 3, menuItem: '' },
        { day: 4, menuItem: '' },
        { day: 5, menuItem: '' },
        { day: 6, menuItem: '' },
      ],
    },
    calendar: {
      currentMonth: [],
      nextMonth: [],
    },
    todos: [],
  };
};

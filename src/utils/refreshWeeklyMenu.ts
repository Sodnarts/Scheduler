import { DinnerPlan } from '../types/Household';
import { getMonday } from './getMonday';

const refreshWeeklyMenu = (weeklyMenu: DinnerPlan) => {
  const newMenu = { ...weeklyMenu };
  newMenu.startDate = getMonday().getTime();
  newMenu.weekOne = newMenu.weekTwo;
  newMenu.weekTwo = [
    { day: 0, menuItem: '' },
    { day: 1, menuItem: '' },
    { day: 2, menuItem: '' },
    { day: 3, menuItem: '' },
    { day: 4, menuItem: '' },
    { day: 5, menuItem: '' },
    { day: 6, menuItem: '' },
  ];

  return newMenu;
};

export { refreshWeeklyMenu };

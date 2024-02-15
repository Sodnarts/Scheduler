import { DinnerPlan } from '../types/Household';

const checkExpiryDate = (weeklyMenu: DinnerPlan) => {
  const weekTime = 60 * 60 * 24 * 7 * 1000;
  return new Date().getTime() - weeklyMenu.startDate > weekTime;
};

export { checkExpiryDate };

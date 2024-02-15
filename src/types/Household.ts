import { Timestamp } from 'firebase/firestore';
import { Day } from './Dates';

export interface Household {
  id: string;
  name: string;
  address: string;
  members: string[];
  shoppingList: ShoppingListItem[];
  receipts: Receipt[];
  weeklyMenu: DinnerPlan;
  calendar: Calendar;
  todos: Todo[];
}

export interface ShoppingListItem {
  name: string;
  quantity: number;
}

export interface Receipt {
  price: string;
  items: ShoppingListItem[];
  date: Timestamp;
  shoppedBy: string;
  duration: number;
}

export interface DinnerPlan {
  startDate: number;
  weekOne: MenuItem[];
  weekTwo: MenuItem[];
}

export interface MenuItem {
  day: Day;
  menuItem: string;
}

export interface Calendar {
  currentMonth: Event[];
  nextMonth: Event[];
}

export interface Event {
  date: number;
  name: string;
}

export interface Todo {
  id: string;
  completed: boolean;
  task: string;
  dueDate: Timestamp;
}

import { Calendar } from '../types/Household';

const findReminders = (calendar: Calendar) => {
  let reminders = calendar.currentMonth
    .filter((e) => e.date >= new Date().getDate())
    .map((e) => {
      return { ...e, month: new Date().getMonth() };
    })
    .sort((a, b) => a.date - b.date);

  let nextMonthReminders = calendar.nextMonth
    .map((e) => {
      return { ...e, month: new Date().getMonth() + 1 };
    })
    .sort((a, b) => a.date - b.date);

  reminders = [...reminders, ...nextMonthReminders];

  return reminders.splice(0, 5);
};

export { findReminders };

import { Event } from '../types/Household';

const findCalendarEvents = (date: number, events: Event[]) => {
  return events.filter((e) => e.date === date);
};

export { findCalendarEvents };

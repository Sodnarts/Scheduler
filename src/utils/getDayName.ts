import { Day } from '../types/Dates';

const getDayName = (day: Day | -1) => {
  switch (day) {
    case 0:
      return 'Monday';
    case 1:
      return 'Tuesday';
    case 2:
      return 'Wednesday';
    case 3:
      return 'Thursday';
    case 4:
      return 'Friday';
    case 5:
      return 'Saturday';
    case 6:
      return 'Sunday';
    case -1:
      return '';
  }
};

export { getDayName };

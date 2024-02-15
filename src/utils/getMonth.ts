import { MONTHS } from '../constants/months';

const getMonth = (month: number) => {
  const m = [];

  for (let i = 0; i < MONTHS[month]; i++) {
    m.push(i + 1);
  }

  return m;
};

export { getMonth };

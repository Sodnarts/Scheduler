const getDatePosition = (date: number, current: Date) => {
  const newDate = new Date(current);
  newDate.setDate(date);
  return newDate.getDay() === 0 ? 7 : newDate.getDay();
};

export { getDatePosition };

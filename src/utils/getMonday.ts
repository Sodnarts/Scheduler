const getMonday = () => {
  const curr = new Date();
  const first = curr.getDate() - (curr.getDay() - 1);

  return new Date(curr.setDate(first));
};

export { getMonday };

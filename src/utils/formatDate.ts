import { Timestamp } from 'firebase/firestore';

const formatDate = (timestamp: Timestamp) => {
  const date = new Date(timestamp.toMillis());

  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;

  return `${day}.${month}.${date.getFullYear()}`;
};

export { formatDate };

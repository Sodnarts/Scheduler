import { User } from '../types/User';

export const createUserObject = (id: string, fullName: string): User => {
  return {
    id,
    fullName: fullName,
    household: '',
  };
};

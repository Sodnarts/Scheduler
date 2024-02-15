import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../types/User';
import { setDoc, doc, collection, onSnapshot } from 'firebase/firestore';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { Collections } from '../constants/firebaseConfig';
import { createUserObject } from '../utils/createUserObject';
import { useAuthContext } from '../hooks/useAuthContext';

interface Props {
  children: ReactNode;
}

interface UserContextProps {
  user: User | undefined;
  createUserDocument: (id: string, username: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);
export const UserProvider = UserContext.Provider;

const UserWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const { currentUser } = useAuthContext();
  const { db } = useFirebaseContext();

  const createUserDocument = async (id: string, username: string) => {
    const usersColRef = collection(db, Collections.USERS);
    return await setDoc(doc(usersColRef, id), createUserObject(id, username));
  };

  const getUser = async (id: string) => {
    const usersColRef = collection(db, Collections.USERS);
    onSnapshot(doc(usersColRef, id), (doc) => {
      setUser((doc.data() as User) ?? null);
    });
  };

  const updateUser = async (user: User) => {
    const usersColRef = collection(db, Collections.USERS);
    return await setDoc(doc(usersColRef, user.id), user);
  };

  const initialLoad = async () => {
    getUser(currentUser?.uid ?? '');
  };

  useEffect(() => {
    currentUser && initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return <UserProvider value={{ user, createUserDocument, updateUser }}>{children}</UserProvider>;
};

export default UserWrapper;

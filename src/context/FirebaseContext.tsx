import { createContext, ReactNode, useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../constants/firebaseConfig';
import { Firestore, getFirestore } from 'firebase/firestore';
import { SplashScreen } from '../components/splash-screen/SplashScreen';

interface Props {
  children: ReactNode;
}

interface FirebaseContextProps {
  firebase: any;
  db: Firestore;
}

export const FirebaseContext = createContext<FirebaseContextProps>({} as FirebaseContextProps);
export const FirebaseProvider = FirebaseContext.Provider;

const FirebaseWrapper = ({ children }: Props) => {
  const [firebase] = useState<FirebaseApp>(initializeApp(firebaseConfig));
  const [db] = useState<Firestore>(getFirestore());

  if (!firebase) return <SplashScreen />;

  return <FirebaseProvider value={{ firebase, db }}>{children}</FirebaseProvider>;
};

export default FirebaseWrapper;

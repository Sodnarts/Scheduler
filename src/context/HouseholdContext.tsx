import { createContext, ReactNode, useEffect, useState } from 'react';
import { Household } from '../types/Household';
import { setDoc, doc, collection, onSnapshot, getDoc } from 'firebase/firestore';
import { useFirebaseContext } from '../hooks/useFirebaseContext';
import { Collections } from '../constants/firebaseConfig';
import { createHouseholdObject } from '../utils/createHouseholdObject';
import { useUserContext } from '../hooks/useUserContext';

interface Props {
  children: ReactNode;
}

interface HouseholdContextProps {
  household: Household | undefined;
  createHousehold: (id: string, name: string, address: string) => Promise<void>;
  joinHousehold: (id: string) => Promise<boolean>;
  updateHousehold: (household: Household) => Promise<void>;
}

export const HouseholdContext = createContext<HouseholdContextProps>({} as HouseholdContextProps);
export const HouseholdProvider = HouseholdContext.Provider;

const HouseholdWrapper = ({ children }: Props) => {
  const [household, setHousehold] = useState<Household>();
  const { db } = useFirebaseContext();
  const { user } = useUserContext();

  const createHousehold = async (id: string, name: string, address: string) => {
    const householdsColRef = collection(db, Collections.HOUSEHOLD);
    return await setDoc(doc(householdsColRef, id), createHouseholdObject(id, name, address, user?.id ?? ''));
  };

  const getHousehold = async (id: string) => {
    const householdsColRef = collection(db, Collections.HOUSEHOLD);
    onSnapshot(doc(householdsColRef, id), (doc) => {
      setHousehold((doc.data() as Household) ?? null);
    });
  };

  const joinHousehold = async (id: string) => {
    const householdsColRef = collection(db, Collections.HOUSEHOLD);
    const household = (await getDoc(doc(householdsColRef, id))).data() as Household;

    if (!household) return false;

    await setDoc(doc(householdsColRef, id), { ...household, members: [...household.members, user?.id] });
    return true;
  };

  const updateHousehold = async (household: Household) => {
    const householdsColRef = collection(db, Collections.HOUSEHOLD);
    return await setDoc(doc(householdsColRef, household.id), household);
  };

  const initialLoad = async () => {
    user?.household && getHousehold(user.household);
  };

  useEffect(() => {
    initialLoad();
  }, [user]);

  return (
    <HouseholdProvider value={{ household, createHousehold, joinHousehold, updateHousehold }}>
      {children}
    </HouseholdProvider>
  );
};

export default HouseholdWrapper;

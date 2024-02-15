import { useContext } from 'react';
import { HouseholdContext } from '../context/HouseholdContext';

export const useHouseholdContext = () => useContext(HouseholdContext);

import { useContext } from "react";
import { FirebaseContext } from "../context/FirebaseContext";

export const useFirebaseContext = () => useContext(FirebaseContext);

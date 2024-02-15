import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  User,
} from "firebase/auth";
import { AuthUser } from "../types/AuthUser";

interface Props {
  children: ReactNode;
}

interface AuthContextProps {
  auth: Auth;
  currentUser: User | null | undefined;
  emailChangeSuccess: boolean;
  emailChangeError: string;
  emailChangeInProgress: boolean;
  signUp: (email: string, password: string) => Promise<AuthUser>;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
  changeEmail: (email: string, password: string) => Promise<void>;
  setEmailChangeSuccess: Dispatch<SetStateAction<boolean>>;
  setEmailChangeError: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const AuthProvider = AuthContext.Provider;

const AuthWrapper = ({ children }: Props) => {
  const [auth] = useState<Auth>(getAuth());
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [emailChangeSuccess, setEmailChangeSuccess] = useState<boolean>(false);
  const [emailChangeError, setEmailChangeError] = useState<string>("");
  const [emailChangeInProgress, setEmailChangeInProgress] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => userCredentials.user as AuthUser)
      .catch((error) => error);
    return response;
  };

  const signIn = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => userCredentials.user as AuthUser)
      .catch((error) => error);
    return response;
  };

  const signOut = () => {
    auth.signOut();
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const changeEmail = async (email: string, password: string) => {
    setEmailChangeInProgress(true);
    setEmailChangeError("");

    signInWithEmailAndPassword(auth, auth.currentUser?.email!, password)
      .then(() => {
        updateEmail(auth.currentUser!, email)
          .then(() => {
            setEmailChangeSuccess(true);
            setEmailChangeInProgress(false);
          })
          .catch((err) => {
            setEmailChangeError(err.code);
            setEmailChangeInProgress(false);
          });
      })
      .catch((err) => {
        setEmailChangeError(err.code);
        setEmailChangeInProgress(false);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthProvider
      value={{
        auth,
        currentUser,
        emailChangeSuccess,
        emailChangeError,
        emailChangeInProgress,
        signUp,
        signIn,
        signOut,
        resetPassword,
        changeEmail,
        setEmailChangeSuccess,
        setEmailChangeError,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default AuthWrapper;

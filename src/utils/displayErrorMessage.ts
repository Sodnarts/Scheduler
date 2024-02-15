import { Dispatch, SetStateAction } from "react";

export const displayErrorMessage = (
  code: string,
  setEmailError: Dispatch<SetStateAction<string>>,
  setPasswordError?: Dispatch<SetStateAction<string>>
) => {
  switch (code) {
    case "auth/invalid-email":
      setEmailError("Invalid E-Mail");
      break;
    case "auth/email-already-in-use":
      setEmailError("E-Mail already in use");
      break;
    case "auth/weak-password":
      setPasswordError && setPasswordError("Password should be at least 6 characters");
      break;
    case "auth/too-many-requests":
      setPasswordError && setPasswordError("Too many attempts. Try again later.");
      break;
    case "auth/user-not-found":
      setEmailError("User doesn't exist");
      break;
    case "auth/wrong-password":
      setPasswordError && setPasswordError("Incorrect password");
      break;
    default:
      setPasswordError && setPasswordError("Something unexpected happened. Error Code: " + code);
      break;
  }
};

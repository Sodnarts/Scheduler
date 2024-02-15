import { User } from "firebase/auth";

export interface AuthUser extends User {
  accessToken: string;
  code: string;
}

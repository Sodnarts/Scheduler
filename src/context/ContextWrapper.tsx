import { ReactNode } from 'react';
import FirebaseWrapper from './FirebaseContext';
import AuthWrapper from './AuthContext';
import UserWrapper from './UserContext';
import HouseholdWrapper from './HouseholdContext';

interface Props {
  children: ReactNode;
}

const ContextWrapper = ({ children }: Props) => {
  return (
    <FirebaseWrapper>
      <AuthWrapper>
        <UserWrapper>
          <HouseholdWrapper>{children}</HouseholdWrapper>
        </UserWrapper>
      </AuthWrapper>
    </FirebaseWrapper>
  );
};

export { ContextWrapper };

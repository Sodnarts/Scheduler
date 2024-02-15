import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { routes } from '../../constants/routes';
import { SignIn } from '../../pages/signin/SignIn';
import { SignUp } from '../../pages/signup/SignUp';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Loader } from '../loader/Loader';

const withLogin = (Component: () => JSX.Element) => () => {
  const [user, setUser] = useState<User | null | undefined>();
  const { auth } = useAuthContext();

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user === undefined) return <Loader />;

  if (!user)
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path={'/*'} element={<Navigate to={routes.signUp} />} />
        </Routes>
      </BrowserRouter>
    );

  return <Component />;
};

export { withLogin };

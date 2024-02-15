import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Household } from '../../pages/household/Household';
import { JoinHousehold } from '../../pages/household/JoinHousehold';
import { CreateHousehold } from '../../pages/household/CreateHousehold';
import { useUserContext } from '../../hooks/useUserContext';
import { Loader } from '../loader/Loader';

const withHousehold = (Component: () => JSX.Element) => () => {
  const { user } = useUserContext();

  if (!user) return <Loader />;

  if (!user?.household)
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes.household} element={<Household />} />
          <Route path={routes.householdJoin} element={<JoinHousehold />} />
          <Route path={routes.householdCreate} element={<CreateHousehold />} />
          <Route path={'/*'} element={<Navigate to={routes.household} />} />
        </Routes>
      </BrowserRouter>
    );

  return <Component />;
};

export { withHousehold };

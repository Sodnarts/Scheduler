import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useUserContext } from '../../hooks/useUserContext';
import { routes } from '../../constants/routes';
import './Household.styles.scss';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

const Household = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="household--container">
      <Logo className="household--logo" />
      <h1 className="household--heading">
        Hi, {user?.fullName.includes(' ') ? user.fullName.split(' ')[0] : user?.fullName}{' '}
      </h1>
      <p className="household--description">
        To use the app you need to be part of a household. Either join an existing household or create one yourself to
        get started.
      </p>

      <div className="household--button-container">
        <SecondaryButton label="Join" onClick={() => navigate(routes.householdJoin)} />
        <p className="household--delimiter">or</p>
        <SecondaryButton label="Create" onClick={() => navigate(routes.householdCreate)} />
      </div>
    </div>
  );
};
export { Household };

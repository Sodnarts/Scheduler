import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import './Settings.styles.scss';

const Settings = () => {
  const { signOut } = useAuthContext();
  const { household } = useHouseholdContext();

  return (
    <div className="settings--container">
      <ReactLogo className="settings--logo" />
      <h1 className="settings--house-name">{household?.name}</h1>
      <p className="settings--house-code">{household?.id}</p>

      <SecondaryButton label="Logout" onClick={signOut} className="settings--logout" />
    </div>
  );
};

export { Settings };

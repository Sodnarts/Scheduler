import { routes } from '../../../constants/routes';
import { ReactComponent as SettingsIcon } from '../../../assets/Settings.svg';
import { color } from '../../../constants/color';

const Settings = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <SettingsIcon
        width={48}
        height={24}
        fill={pathname === routes.settings ? color.primary : color.white}
        className="nav--icon"
      />
      <span>Settings</span>
    </>
  );
};

export { Settings };

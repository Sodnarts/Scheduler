import { routes } from '../../../constants/routes';
import { ReactComponent as HomeIcon } from '../../../assets/Home.svg';
import { color } from '../../../constants/color';

const Home = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <HomeIcon
        width={48}
        height={24}
        fill={pathname === routes.dashboard ? color.primary : color.white}
        className="nav--icon"
      />
      <span>Dashboard</span>
    </>
  );
};

export { Home };

import { Loader } from '../loader/Loader';
import './SplashScreen.styles.scss';
import { ReactComponent as Logo } from '../../assets/AppLogo.svg';

const SplashScreen = () => {
  return (
    <div className="splash-screen--container">
      <Logo className="splash-screen--logo" />
      <Loader />
    </div>
  );
};

export { SplashScreen };

import { useState } from 'react';
import { InputField } from '../../components/input-field/InputField';
import './SignIn.styles.scss';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useAuthContext } from '../../hooks/useAuthContext';
import { displayErrorMessage } from '../../utils/displayErrorMessage';
import { InputColor, InputType } from '../../types/Input';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetSent, setResetSent] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>();
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuthContext();

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    setEmailError('');
    setPasswordError('');
    setResetSent(false);
    setResetEmail('');

    !response.accessToken && displayErrorMessage(response.code, setEmailError, setPasswordError);
  };

  const handlePasswordReset = async () => {
    const res = await resetPassword(email);

    setResetEmail(email);
    setResetSent(true);
  };

  return (
    <div className="sign-in--container">
      <ReactLogo className="sign-in--logo" />
      <div className="sign-in--input-container">
        <p className="sign-up--description">
          Welcome to Shopping List! <span>The app that makes your life easier.</span>
        </p>
        <InputField
          label="Email"
          value={email}
          placeholder="Enter email"
          onChange={setEmail}
          type={InputType.EMAIL}
          color={InputColor.GREEN}
          error={emailError}
          autoFocus
          className="sign-in--input"
        />
        <InputField
          label="Password"
          value={password}
          placeholder="Enter password"
          onChange={setPassword}
          type={InputType.PASSWORD}
          color={InputColor.GREEN}
          error={passwordError}
          className="sign-in--input"
        />
      </div>
      <PrimaryButton
        label="Sign in"
        onClick={handleSignIn}
        className="sign-in--button"
        disabled={!email.length || !password.length}
      />
      {passwordError &&
        (!resetSent ? (
          <a className="sign-in--forgotten-password" onClick={handlePasswordReset}>
            Forgot your password?
          </a>
        ) : (
          <p className="sign-in--reset-sent">A password reset link has been sent to {resetEmail}.</p>
        ))}

      <p className="sign-in--no-account">Don't have an account yet?</p>
      <SecondaryButton label="Sign up" onClick={() => navigate(routes.signUp)} />
    </div>
  );
};

export { SignIn };

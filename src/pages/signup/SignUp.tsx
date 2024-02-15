import { useState } from 'react';
import { InputField } from '../../components/input-field/InputField';
import './SignUp.styles.scss';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useAuthContext } from '../../hooks/useAuthContext';
import { displayErrorMessage } from '../../utils/displayErrorMessage';
import { useUserContext } from '../../hooks/useUserContext';
import { InputColor, InputType } from '../../types/Input';

const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { signUp } = useAuthContext();
  const { createUserDocument } = useUserContext();

  const handleSignUp = async () => {
    const response = await signUp(email, password);
    setEmailError('');
    setPasswordError('');

    response.accessToken
      ? createUserDocument(response.uid, name)
      : displayErrorMessage(response.code, setEmailError, setPasswordError);
  };

  return (
    <div className="sign-up--container">
      <ReactLogo className="sign-up--logo" />
      <div className="sign-up--input-container">
        <p className="sign-up--description">
          <span>Make your life easier by keeping track of your todos, shopping lists, and more.</span>
        </p>
        <InputField
          label="Name"
          value={name}
          placeholder="Enter name"
          onChange={setName}
          color={InputColor.GREEN}
          autoFocus
          className="sign-up--input"
        />
        <InputField
          label="Email"
          value={email}
          placeholder="Enter email"
          onChange={setEmail}
          type={InputType.EMAIL}
          color={InputColor.GREEN}
          error={emailError}
          className="sign-up--input"
        />
        <InputField
          label="Password"
          value={password}
          placeholder="Enter password"
          onChange={setPassword}
          type={InputType.PASSWORD}
          color={InputColor.GREEN}
          error={passwordError}
          className="sign-up--input"
        />
      </div>
      <PrimaryButton
        label="Sign up"
        onClick={handleSignUp}
        className="sign-up--button"
        disabled={!name.length || !email.length || !password.length}
      />
      <p className="sign-up--existing-account">Already have an account?</p>
      <SecondaryButton label="Sign in" onClick={() => navigate(routes.signIn)} />
    </div>
  );
};

export { SignUp };

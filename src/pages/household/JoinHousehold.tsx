import { InputField } from '../../components/input-field/InputField';
import './Household.styles.scss';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useState } from 'react';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { useUserContext } from '../../hooks/useUserContext';
import { generateCode } from '../../utils/generateCode';

const JoinHousehold = () => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { joinHousehold } = useHouseholdContext();
  const { user, updateUser } = useUserContext();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await joinHousehold(code);

    if (!res) {
      setError('Invalid code. Please try again.');
      setIsLoading(false);
      return;
    }

    user && (await updateUser({ ...user, household: code }));
    setIsLoading(false);
  };

  return (
    <div className="household--container">
      <Logo className="household--logo" />
      <h1 className="household--heading--small">Enter household code</h1>
      <InputField
        label="Code"
        onChange={(e) => setCode(e.toUpperCase())}
        value={code}
        placeholder="XXXXXX"
        maxLength={6}
        error={error}
      />
      <div className="household--button-container">
        <SecondaryButton label="Join" onClick={handleClick} isLoading={isLoading} />
      </div>
    </div>
  );
};

export { JoinHousehold };

/**
 * Create Household context.
 * Find household which has the given code.
 * If no household has code, return error.
 * Add code / householdID to user through User context.
 * Should load main parts of app automatically.
 *
 * CREATE:
 * Enter household info
 * Generate code. Check if any existing households has given code. If it has, generate new code.
 * Create household in firebase, using the code as DocumentID.
 * Add code/householdID to user through User context.
 * Should load main parts of app automatically.
 */

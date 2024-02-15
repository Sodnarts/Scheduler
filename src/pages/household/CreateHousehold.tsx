import { InputField } from '../../components/input-field/InputField';
import './Household.styles.scss';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useState } from 'react';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { useUserContext } from '../../hooks/useUserContext';
import { generateCode } from '../../utils/generateCode';

const CreateHousehold = () => {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createHousehold } = useHouseholdContext();
  const { user, updateUser } = useUserContext();

  const handleClick = async () => {
    setIsLoading(true);

    const code = generateCode();
    await createHousehold(code, name, address);

    user && (await updateUser({ ...user, household: code }));
    setIsLoading(false);
  };

  return (
    <div className="household--container">
      <Logo className="household--logo" />
      <h1 className="household--heading--small">Enter household information</h1>
      <InputField label="Nickname" onChange={setName} value={name} placeholder="Household name" />
      <InputField label="Address" onChange={setAddress} value={address} placeholder="Household address" />

      <div className="household--button-container">
        <SecondaryButton label="Create" onClick={handleClick} isLoading={isLoading} />
      </div>
    </div>
  );
};

export { CreateHousehold };

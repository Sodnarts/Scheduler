import { InputType } from '../../types/Input';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SecondaryButton } from '../buttons/SecondaryButton';
import { InputField } from '../input-field/InputField';
import './Dialog.styles.scss';

interface Props {
  value: string;
  type: InputType;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Dialog = ({
  value,
  type,
  onChange,
  onConfirm,
  onCancel,
  label = '',
  placeholder,
  isLoading,
  disabled,
}: Props) => {
  return (
    <>
      <div className="dialog--background" />
      <div className="dialog">
        <InputField
          className="dialog--input"
          label={label}
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          autoFocus
        />

        <div className="dialog--button--container">
          <SecondaryButton className="dialog--button dialog--button-negative" label="Cancel" onClick={onCancel} />
          <PrimaryButton
            className="dialog--button"
            label="OK"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
};

export { Dialog };

import { InputColor, InputType } from '../../types/Input';
import { ValidationError } from '../validation-error/ValidationError';
import './InputField.styles.scss';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  color?: InputColor;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  autoFocus?: boolean;
  onBlur?: (value: string) => void;
}

const InputField = ({
  label,
  value,
  placeholder,
  onChange,
  type = InputType.TEXT,
  color = InputColor.WHITE,
  error,
  disabled,
  maxLength,
  className,
  autoFocus,
  onBlur,
}: Props) => {
  return (
    <div className={`input--container ${className && className}`}>
      <label htmlFor={label} className="input--label">
        {label}
      </label>
      <input
        name={label}
        id={label}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
        className={`input--field ${disabled && 'input--field-disabled'} ${color}`}
        disabled={disabled}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
      {error && <ValidationError errorMessage={error} />}
    </div>
  );
};

export { InputField };

import './RadioButton.styles.scss';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}
const RadioButton = ({ label, checked, onChange = () => undefined }: Props) => {
  return (
    <div className="radio-button--container">
      <input
        className="radio-button--input-hidden"
        id={`radio-${label}`}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <label className="radio-button--input" htmlFor={`radio-${label}`}>
        <div className="radio-button--input--inner" />
      </label>

      <label className="radio-button--label" htmlFor={`radio-${label}`}>
        {label}
      </label>
    </div>
  );
};

export { RadioButton };

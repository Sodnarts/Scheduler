import { Loader } from "../loader/Loader";
import "./Buttons.styles.scss";

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  small?: boolean;
}

const PrimaryButton = ({ label, onClick, disabled, isLoading, className, small }: Props) => {
  return (
    <button
      className={`button button--primary ${className} ${disabled && "button--disabled"}  ${small && "button--small"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <Loader className="button--loader" classNameSpinner="button--loader--spinner" /> : label}
    </button>
  );
};

export { PrimaryButton };

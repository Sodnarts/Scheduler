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

const SecondaryButton = ({ label, onClick, disabled, isLoading, className, small }: Props) => {
  return (
    <button
      className={`button button--secondary ${className} ${small && "button--small"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <Loader className="button--loader" classNameSpinner="button--loader--spinner" /> : label}
    </button>
  );
};

export { SecondaryButton };

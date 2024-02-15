import './Buttons.styles.scss';
import { ReactComponent as ChevronThin } from '../../assets/ChevronThin.svg';

interface Props {
  label: string;
  disabled?: boolean;
  className?: string;
  suffix?: string;
  light?: boolean;
  onClick?: () => void;
}

const AlternativeButton = ({ label, disabled, className, suffix, light, onClick }: Props) => {
  return (
    <button
      className={`button button--alternative ${className} ${disabled && 'button--disabled'} ${
        light && 'button--alternative--light'
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
      {suffix && <p className="button--alternative--suffix">{suffix}</p>}
      {onClick && <ChevronThin fill={'white'} className="button--alternative-chevron" />}
    </button>
  );
};

export { AlternativeButton };

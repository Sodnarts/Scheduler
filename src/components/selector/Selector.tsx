import { ReactNode } from 'react';
import './Selector.styles.scss';

interface Props {
  value: string;
  selected: boolean;
  suffix?: ReactNode;
  onSelect: () => void;
}

const Selector = ({ value, selected, suffix, onSelect }: Props) => {
  return selected ? (
    <button className="selector--selected" onClick={onSelect}>
      {value}
      <p className="selector--suffix">{suffix}</p>
    </button>
  ) : (
    <button className="selector" onClick={onSelect}>
      {value}
      <p className="selector--suffix">{suffix}</p>
    </button>
  );
};

export { Selector };

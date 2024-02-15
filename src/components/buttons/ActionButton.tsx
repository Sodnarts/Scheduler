import './Buttons.styles.scss';
import { ReactComponent as PlusIcon } from '../../assets/PlusIcon.svg';
import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  onClick: () => void;
}

const ActionButton = ({ icon, onClick }: Props) => {
  return (
    <button className="button--action" onClick={onClick}>
      {icon ? icon : <PlusIcon fill={'#18172A'} />}
    </button>
  );
};

export { ActionButton };

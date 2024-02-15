import { ReactNode } from 'react';

interface Props {
  label: string;
  onClick: () => void;
  icon: ReactNode;
}

const ActionBarButton = ({ label, onClick, icon }: Props) => {
  return (
    <button className="button--action-bar" onClick={onClick}>
      <div className="button--action-bar--icon-container">{icon}</div>
      <span className="button--action-bar--label">{label}</span>
    </button>
  );
};

export { ActionBarButton };

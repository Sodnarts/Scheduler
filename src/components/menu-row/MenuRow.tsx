import './MenuRow.styles.scss';

interface Props {
  day: string;
  menuItem: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  borderBottom?: boolean;
}

const MenuRow = ({ day, menuItem, onChange, onBlur, disabled, borderBottom }: Props) => {
  return (
    <div className={`menu-row--container ${borderBottom && 'menu-row--container--border-bottom'}`}>
      <p className="menu-row--text">{day}</p>
      <div className="menu-row--divider" />
      <input
        className="menu-row--input"
        value={menuItem}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={disabled ? '' : `${day}'s food..`}
        disabled={disabled}
      />
    </div>
  );
};

export { MenuRow };

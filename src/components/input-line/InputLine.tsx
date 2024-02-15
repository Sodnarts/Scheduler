import './InputLine.styles.scss';

interface Props {
  id: string;
  value: string;
  suffix?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onEnter?: () => void;
  onDelete?: () => void;
}

const InputLine = ({ id, value, suffix, onChange, onBlur, onEnter, onDelete }: Props) => {
  return (
    <div className="input-line--container">
      <input
        id={id}
        className="input-line input-line--hidden"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur()}
        maxLength={20}
        onKeyUp={(e) => {
          switch (e.key) {
            case 'Enter':
              onEnter && onEnter();
              break;
            case 'Backspace':
              onDelete && onDelete();
              break;
          }
        }}
      />
      <p className="input-line--suffix">{suffix}</p>
    </div>
  );
};

export { InputLine };

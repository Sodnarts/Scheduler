import { useEffect, useState } from 'react';
import { Event } from '../../types/Household';
import './CircledNumber.styles.scss';

export enum NumberBackgroundColor {
  NONE = 'transparent',
  GREY = '#555555',
  PRIMARY = '#32fcb3',
}

export enum NumberColor {
  WHITE = '#ffffff',
  DARK = '#222222',
}

interface Props {
  number: number;
  color: NumberColor;
  backgroundColor: NumberBackgroundColor;
  events?: Event[];
  showEvents?: boolean;
  disabled?: boolean;
  style?: {
    [key: string]: string | number;
  };
  onClick?: () => void;
}

const CircledNumber = ({
  number,
  color,
  backgroundColor,
  events = [],
  showEvents = false,
  disabled = false,
  style,
  onClick = () => undefined,
}: Props) => {
  const [position, setPosition] = useState<Object>({});

  useEffect(() => {
    if (!showEvents || !events.length) {
      setPosition({});
      return;
    }

    var popup = document.getElementById('events-popup') as HTMLDivElement;
    let rect = popup.getBoundingClientRect();

    rect.left < 16 && setPosition({ marginLeft: Math.abs(rect.left) * 2 + 40 });
    rect.right > window.innerWidth - 16 && setPosition({ marginRight: (rect.right - window.innerWidth) * 2 + 40 });
  }, [showEvents]);

  return (
    <div
      className="circled-number--background"
      style={{ backgroundColor: backgroundColor, ...style }}
      onClick={!disabled ? onClick : undefined}
    >
      <p className="circled-number--number" style={{ color: color, opacity: disabled ? 0.25 : 1 }}>
        {number}
      </p>
      {showEvents && !!events.length && (
        <div className="circled-number--events-popup" id="events-popup" style={position}>
          {events.map((e, i) => (
            <p key={`event-${i}`} className="circled-number--events-name">
              {e.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export { CircledNumber };

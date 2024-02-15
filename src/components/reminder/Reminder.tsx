import { MONTH_NAMES } from '../../constants/months';
import { EventWithMonth } from '../../types/EventWithMonth';
import './Reminder.styles.scss';

interface Props {
  event: EventWithMonth;
}

const Reminder = ({ event }: Props) => {
  const formatDate = (date: number, month: number) => {
    return `${date}. ${MONTH_NAMES[month]}`;
  };

  return (
    <div className="reminder--container">
      <p className="reminder--text">{event.name}</p>
      <p className="reminder--text reminder--text-small">{formatDate(event.date, event.month)}</p>
    </div>
  );
};

export { Reminder };

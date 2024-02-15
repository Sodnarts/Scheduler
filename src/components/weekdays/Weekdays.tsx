import './Weekdays.styles.scss';

const Weekdays = () => {
  return (
    <div className="weekdays--grid">
      <p className="weekdays--grid--day">M</p>
      <p className="weekdays--grid--day">T</p>
      <p className="weekdays--grid--day">W</p>
      <p className="weekdays--grid--day">T</p>
      <p className="weekdays--grid--day">F</p>
      <p className="weekdays--grid--day">S</p>
      <p className="weekdays--grid--day">S</p>
    </div>
  );
};

export { Weekdays };

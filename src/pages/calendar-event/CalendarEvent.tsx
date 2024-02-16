import './CalendarEvent.styles.scss';
import { InputField } from '../../components/input-field/InputField';
import { useEffect, useState } from 'react';
import { getMonth } from '../../utils/getMonth';
import { CircledNumber, NumberBackgroundColor, NumberColor } from '../../components/circled-number/CircledNumber';
import { getDatePosition } from '../../utils/getDatePosition';
import { RadioButton } from '../../components/radio-button/RadioButton';
import { Weekdays } from '../../components/weekdays/Weekdays';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { Loader } from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { InputColor } from '../../types/Input';

const CalendarEvent = () => {
  const [eventName, setEventName] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const { household, updateHousehold } = useHouseholdContext();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();

    !!selectedMonth && date.setMonth(new Date().getMonth() + 1);
    setDate(date);
  }, [selectedMonth]);

  if (!household) return <Loader />;

  const onSave = async () => {
    setLoading(true);

    !selectedMonth
      ? household?.calendar.currentMonth.push({ name: eventName, date: selectedDate })
      : household?.calendar.nextMonth.push({ name: eventName, date: selectedDate });

    await updateHousehold(household);
    setLoading(false);
    navigate(-1);
  };

  return (
    <div className="calendar-event--container">
      <InputField
        className="calendar-event--input-field"
        label="Event"
        placeholder="What's happening?"
        value={eventName}
        color={InputColor.GREEN}
        onChange={setEventName}
      />
      <div className="calendar-event--radio-group">
        <RadioButton label={'February'} checked={selectedMonth === 0} onChange={() => setSelectedMonth(0)} />
        <RadioButton label={'March'} checked={selectedMonth === 1} onChange={() => setSelectedMonth(1)} />
      </div>
      <Weekdays />
      <div className="calendar-event--grid">
        {getMonth(date.getMonth()).map((n, i) => (
          <CircledNumber
            key={`current-month-${i}`}
            style={{ gridColumnStart: getDatePosition(n, date) }}
            number={n}
            color={selectedDate === n ? NumberColor.DARK : NumberColor.WHITE}
            backgroundColor={selectedDate === n ? NumberBackgroundColor.PRIMARY : NumberBackgroundColor.NONE}
            disabled={!selectedMonth && n < new Date().getDate()}
            onClick={() => setSelectedDate(n)}
          />
        ))}
      </div>
      <PrimaryButton label="Save" onClick={onSave} disabled={!eventName.length || !selectedDate} isLoading={loading} />
    </div>
  );
};

export { CalendarEvent };

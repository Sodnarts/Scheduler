import './Calendar.styles.scss';
import { CircledNumber, NumberBackgroundColor, NumberColor } from '../../components/circled-number/CircledNumber';
import { getDatePosition } from '../../utils/getDatePosition';
import { getMonth } from '../../utils/getMonth';
import { useEffect, useState } from 'react';
import { MONTH_NAMES } from '../../constants/months';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { Loader } from '../../components/loader/Loader';
import { findCalendarEvents } from '../../utils/findCalendarEvents';
import { ActionButton } from '../../components/buttons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Weekdays } from '../../components/weekdays/Weekdays';

const Calendar = () => {
  const [currentDate] = useState<Date>(new Date());
  const [nextMonth, setNextMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(-1);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const { household } = useHouseholdContext();
  const navigate = useNavigate();

  useEffect(() => {
    const next = new Date();
    next.setMonth(new Date().getMonth() + 1);
    setNextMonth(next);
  }, []);

  const toggleEvents = (date: number, month: number) => {
    selectedDate === date ? setSelectedDate(-1) : setSelectedDate(date);
    setSelectedMonth(month);
  };

  if (!household) return <Loader />;

  return (
    <div className="calendar--container">
      <Weekdays />
      <div className="calendar--grid calendar--grid--left-align">
        <p
          className="calendar--grid--month"
          style={{ gridColumnStart: getDatePosition(1, currentDate), gridColumnEnd: 7 }}
        >
          {MONTH_NAMES[currentDate.getMonth()]}
        </p>
        <div
          className="calendar--grid--line"
          style={{ gridColumnStart: getDatePosition(1, currentDate), gridColumnEnd: 8 }}
        />
      </div>
      <div className="calendar--grid">
        {getMonth(currentDate.getMonth()).map((n, i) => (
          <CircledNumber
            key={`current-month-${i}`}
            style={{ gridColumnStart: getDatePosition(n, currentDate) }}
            number={n}
            events={findCalendarEvents(n, household.calendar.currentMonth)}
            showEvents={n === selectedDate && selectedMonth === 0}
            onClick={() => toggleEvents(n, 0)}
            color={currentDate.getDate() === n ? NumberColor.DARK : NumberColor.WHITE}
            backgroundColor={
              currentDate.getDate() === n
                ? NumberBackgroundColor.PRIMARY
                : !!findCalendarEvents(n, household.calendar.currentMonth).length
                ? NumberBackgroundColor.GREY
                : NumberBackgroundColor.NONE
            }
          />
        ))}
      </div>
      <div className="calendar--grid calendar--grid--left-align">
        <p
          className="calendar--grid--month"
          style={{ gridColumnStart: getDatePosition(1, nextMonth), gridColumnEnd: 7 }}
        >
          {MONTH_NAMES[nextMonth.getMonth()]}
        </p>
        <div
          className="calendar--grid--line"
          style={{ gridColumnStart: getDatePosition(1, nextMonth), gridColumnEnd: 8 }}
        />
      </div>
      <div className="calendar--grid">
        {getMonth(nextMonth.getMonth()).map((n, i) => (
          <CircledNumber
            key={`next-month-${i}`}
            style={{ gridColumnStart: getDatePosition(n, nextMonth) }}
            number={n}
            events={findCalendarEvents(n, household.calendar.nextMonth)}
            showEvents={n === selectedDate && selectedMonth === 1}
            onClick={() => toggleEvents(n, 1)}
            color={NumberColor.WHITE}
            backgroundColor={
              !!findCalendarEvents(n, household.calendar.nextMonth).length
                ? NumberBackgroundColor.GREY
                : NumberBackgroundColor.NONE
            }
          />
        ))}
      </div>
      <ActionButton onClick={() => navigate(routes.calendarEvent)} />
    </div>
  );
};

export { Calendar };

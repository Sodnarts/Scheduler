import './TodoCreate.styles.scss';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
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
import { Timestamp } from 'firebase/firestore';
import { generateCode } from '../../utils/generateCode';
import { MONTH_NAMES } from '../../constants/months';
import { InputColor } from '../../types/Input';

const TodoCreate = () => {
  const [taskName, setTaskName] = useState<string>('');
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

    const date = new Date();
    date.setDate(selectedDate);
    date.setMonth(!!selectedMonth ? new Date().getMonth() + 1 : new Date().getMonth());
    date.setHours(0, 0, 0);

    household.todos.push({ completed: false, id: generateCode(20), task: taskName, dueDate: Timestamp.fromDate(date) });

    await updateHousehold(household);
    setLoading(false);
    navigate(-1);
  };

  return (
    <div className="todo-create--container">
      <ReactLogo className="todo-create--logo" />
      <InputField
        className="todo-create--input-field"
        label="Todo"
        placeholder="What needs to be done?"
        color={InputColor.GREEN}
        value={taskName}
        autoFocus
        onChange={setTaskName}
      />
      <div className="todo-create--radio-group">
        <RadioButton
          label={MONTH_NAMES[new Date().getMonth()]}
          checked={selectedMonth === 0}
          onChange={() => setSelectedMonth(0)}
        />
        <RadioButton
          label={MONTH_NAMES[new Date().getMonth() + 1]}
          checked={selectedMonth === 1}
          onChange={() => setSelectedMonth(1)}
        />
      </div>
      <Weekdays />
      <div className="todo-create--grid">
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
      <PrimaryButton label="Save" onClick={onSave} disabled={!taskName.length || !selectedDate} isLoading={loading} />
    </div>
  );
};

export { TodoCreate };

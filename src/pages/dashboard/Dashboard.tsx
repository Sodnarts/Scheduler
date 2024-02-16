import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import './Dashboard.styles.scss';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import { ReactComponent as List } from '../../assets/List.svg';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import { ReactComponent as Receipt } from '../../assets/Receipt.svg';
import { ActionBarButton } from '../../components/buttons/ActionBarButton';
import { color } from '../../constants/color';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { findReminders } from '../../utils/findReminders';
import { Loader } from '../../components/loader/Loader';
import { Reminder } from '../../components/reminder/Reminder';
import { useEffect, useState } from 'react';
import { EventWithMonth } from '../../types/EventWithMonth';

const Dashboard = () => {
  const [reminders, setReminders] = useState<EventWithMonth[]>([]);
  const [menu, setMenu] = useState<string>('');
  const { household } = useHouseholdContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!household) return;
    setReminders(findReminders(household.calendar));

    let today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    setMenu(household.weeklyMenu.weekOne.find((m) => m.day === today)?.menuItem ?? '');
  }, [household]);

  if (!household) return <Loader />;

  return (
    <div className="dashboard--container">
      <h1 className="dashboard--house-name">{household?.name}</h1>
      <p className="dashboard--house-code">{household?.id}</p>
      {!!menu.length && (
        <div className="dashboard--content--container">
          <p className="dashboard--content--today--label">Today's dish</p>
          <p className="dashboard--content--today">{menu}</p>
        </div>
      )}
      {!!reminders.length && (
        <div className="dashboard--reminders--container">
          <p className="dashboard--reminders--label">Reminders</p>
          {reminders.map((e) => (
            <Reminder event={e} />
          ))}
        </div>
      )}
      <div className="dashboard--action-bar">
        <ActionBarButton
          label="List"
          onClick={() => navigate(routes.shoppingList)}
          icon={<List stroke={color.primary} />}
        />
        <ActionBarButton label="Menu" onClick={() => navigate(routes.menu)} icon={<Menu fill={color.primary} />} />
        <ActionBarButton
          label="Calendar"
          onClick={() => navigate(routes.calendar)}
          icon={<Calendar fill={color.primary} />}
        />
        <ActionBarButton
          label="Receipts"
          onClick={() => navigate(routes.receipts)}
          icon={<Receipt fill={color.primary} />}
        />
      </div>
    </div>
  );
};

export { Dashboard };

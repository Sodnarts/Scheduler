import './Menu.styles.scss';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { MenuRow } from '../../components/menu-row/MenuRow';
import { useEffect, useState } from 'react';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { Loader } from '../../components/loader/Loader';
import { getDayName } from '../../utils/getDayName';
import { Day, Week } from '../../types/Dates';
import { DinnerPlan } from '../../types/Household';
import { checkExpiryDate } from '../../utils/checkExpiryDate';
import { refreshWeeklyMenu } from '../../utils/refreshWeeklyMenu';

const Menu = () => {
  const { household, updateHousehold } = useHouseholdContext();
  const [weeklyMenu, setWeeklyMenu] = useState<DinnerPlan>();

  useEffect(() => {
    if (!household) return;

    setWeeklyMenu(household.weeklyMenu);
    const expired = checkExpiryDate(household.weeklyMenu);

    if (expired) {
      const newMenu = refreshWeeklyMenu(household.weeklyMenu);
      updateHousehold({ ...household, weeklyMenu: newMenu });
    }
  }, [household, updateHousehold]);

  if (!household || !weeklyMenu) return <Loader />;

  const onChange = (week: Week, day: Day, value: string) => {
    const tmpMenu = { ...weeklyMenu };

    !!week ? (tmpMenu.weekOne[day].menuItem = value) : (tmpMenu.weekTwo[day].menuItem = value);
    setWeeklyMenu(tmpMenu);
  };

  const onBlur = () => {
    updateHousehold({ ...household, weeklyMenu: weeklyMenu });
  };

  return (
    <div className="menu--container">
      <ReactLogo className="menu--logo" />

      {weeklyMenu.weekOne.map((m, i) => (
        <MenuRow
          key={`week-one-menu-${i}`}
          day={getDayName(m.day)}
          menuItem={m.menuItem}
          onChange={(value) => onChange(0, i as Day, value)}
          onBlur={onBlur}
        />
      ))}

      <MenuRow day={getDayName(-1)} menuItem="" onChange={() => undefined} disabled />

      {weeklyMenu.weekTwo.map((m, i) => (
        <MenuRow
          key={`week-two-menu-${i}`}
          day={getDayName(m.day)}
          menuItem={m.menuItem}
          onChange={(value) => onChange(1, i as Day, value)}
          borderBottom={i === 6}
          onBlur={onBlur}
        />
      ))}
    </div>
  );
};

export { Menu };

import './ShoppingList.styles.scss';
import { ReactComponent as Cart } from '../../assets/Cart.svg';
import { InputLine } from '../../components/input-line/InputLine';
import { useEffect, useState } from 'react';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { Loader } from '../../components/loader/Loader';
import { ShoppingListItem } from '../../types/Household';
import { formatShoppingList } from '../../utils/formatShoppingList';
import { ActionButton } from '../../components/buttons/ActionButton';
import { color } from '../../constants/color';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';

const ShoppingList = () => {
  const { household, updateHousehold } = useHouseholdContext();
  const [list, setList] = useState<ShoppingListItem[]>([{ name: '', quantity: 1 }]);
  const [focus, setFocus] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    !!household && setList([...household.shoppingList, { name: '', quantity: 1 }]);
  }, [household]);

  useEffect(() => {
    if (!household) return;

    const focusEl = document.getElementById(`shopping-list-input-${focus}`) as HTMLInputElement;
    focusEl.focus();
  }, [focus]);

  if (!household) return <Loader />;

  const handleChange = (val: string, i: number) => {
    let tmpList = [...list];
    if (!val.length) {
      tmpList.splice(i, 1);
      i > 0 && setFocus(i - 1);
    } else {
      tmpList[i].name = val;
    }

    setList([...tmpList]);
  };

  const onBlur = () => {
    updateHousehold({ ...household, shoppingList: formatShoppingList(list) });
  };

  const onEnter = (index: number) => {
    let listStart = [...list].splice(0, index + 1);
    let listEnd = [...list].splice(index + 1, list.length);
    setFocus(index + 1);
    setList([...listStart, { name: '', quantity: 1 }, ...listEnd]);
  };

  const onDelete = (index: number) => {
    if (list[index].name.length >= 1) return;

    let tmpList = [...list];
    tmpList.splice(index, 1);
    setList([...tmpList]);
    index > 0 && setFocus(index - 1);
  };

  return (
    <div className="shopping-list--container">
      <div className="shopping-list--input-container">
        {list.map((l, i) => (
          <InputLine
            key={`shopping-list-input-${i}`}
            id={`shopping-list-input-${i}`}
            value={l.name}
            suffix={l.quantity > 1 ? `x${l.quantity}` : ''}
            onChange={(e) => handleChange(e, i)}
            onBlur={() => onBlur()}
            onEnter={() => onEnter(i)}
            onDelete={() => onDelete(i)}
          />
        ))}
      </div>
      <ActionButton onClick={() => navigate(routes.shoppingCart)} icon={<Cart fill={color.background} />} />
    </div>
  );
};

export { ShoppingList };

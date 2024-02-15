import './ShoppingCart.styles.scss';
import { ReactComponent as Receipt } from '../../assets/Receipt.svg';
import { ReactComponent as Checkmark } from '../../assets/Checkmark.svg';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { useEffect, useState } from 'react';
import { ShoppingListItem } from '../../types/Household';
import { Selector } from '../../components/selector/Selector';
import { endShoppingTrip } from '../../utils/endShoppingTrip';
import { ActionButton } from '../../components/buttons/ActionButton';
import { color } from '../../constants/color';
import { Dialog } from '../../components/dialog/Dialog';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useUserContext } from '../../hooks/useUserContext';
import { InputType } from '../Input';

export interface ShoppingCartItem extends ShoppingListItem {
  selected: boolean;
  quantityBought: number;
}

const ShoppingCart = () => {
  const { household, updateHousehold } = useHouseholdContext();
  const { user } = useUserContext();
  const [list, setList] = useState<ShoppingCartItem[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [startTime] = useState<number>(new Date().getTime());
  const navigate = useNavigate();

  useEffect(() => {
    !!household &&
      setList(
        household.shoppingList.map((el) => {
          return { ...el, selected: false, quantityBought: 0 };
        })
      );
  }, [household]);

  const onSelect = (index: number) => {
    const tmpList = [...list];

    if (tmpList[index].selected) {
      tmpList[index].quantityBought = 0;
      tmpList[index].selected = false;
    } else {
      tmpList[index].quantity - tmpList[index].quantityBought > 1
        ? tmpList[index].quantityBought++
        : (tmpList[index].selected = true);
    }

    setList([...tmpList]);
  };

  const onConfirm = async () => {
    setLoading(true);
    household && (await updateHousehold(endShoppingTrip(household, list, price, user?.fullName || '', startTime)));
    setLoading(false);
    navigate(routes.dashboard);
  };

  const onCancel = () => {
    setLoading(false);
    setPrice('');
    setOpenDialog(false);
  };

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div className="shopping-cart--container">
      <div className="shopping-cart--input-container">
        {list.map((l, i) => (
          <Selector
            key={i}
            value={l.name}
            selected={list[i].selected}
            suffix={
              l.selected ? (
                <Checkmark className="shopping-cart--checkmark" fill={color.primary} />
              ) : l.quantity - l.quantityBought > 1 ? (
                `x${l.quantity - l.quantityBought}`
              ) : (
                ''
              )
            }
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
      <ActionButton onClick={toggleDialog} icon={<Receipt fill={color.background} />} />
      {openDialog && (
        <Dialog
          value={price}
          onChange={setPrice}
          type={InputType.NUMBER}
          onConfirm={onConfirm}
          onCancel={onCancel}
          placeholder="Price"
          isLoading={loading}
          disabled={price.length < 1}
        />
      )}
    </div>
  );
};

export { ShoppingCart };

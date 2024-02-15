import './ShoppingLists.styles.scss';
import { ReactComponent as ReactLogo } from '../../assets/Logo.svg';
import { ActionButton } from '../../components/buttons/ActionButton';
import { Card } from '../../components/cards/Card';
import { ShoppingCard } from '../../components/cards/ShoppingCard';

const ShoppingLists = () => {
  return (
    <div className="shopping-lists--container">
      <ReactLogo className="shopping-lists--logo" />
      <Card>
        <ShoppingCard />
      </Card>
      <Card>hei</Card>
      <ActionButton onClick={() => undefined} />
    </div>
  );
};

export { ShoppingLists };

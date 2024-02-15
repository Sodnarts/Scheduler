import { routes } from '../../../constants/routes';
import { ReactComponent as TodosIcon } from '../../../assets/Todos.svg';
import { color } from '../../../constants/color';

const Todos = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <TodosIcon
        width={48}
        height={24}
        fill={pathname === routes.todos ? color.primary : color.white}
        className="nav--icon"
      />
      <span>Todos</span>
    </>
  );
};

export { Todos };

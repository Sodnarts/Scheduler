import { Todo } from '../../types/Household';
import { ReactComponent as Delete } from '../../assets/Delete.svg';
import { ReactComponent as Approved } from '../../assets/Approved.svg';
import { ReactComponent as Bell } from '../../assets/Bell.svg';
import { ReactComponent as InProgress } from '../../assets/InProgress.svg';
import './TodoCard.styles.scss';
import { color } from '../../constants/color';
import { TodoStatus, getTodoStatus, getTodoStatusColors } from '../../utils/getTodoStatus';

interface Props {
  todo: Todo;
  onClick: () => void;
  onDelete: () => void;
}

const TodoCard = ({ todo, onClick, onDelete }: Props) => {
  return (
    <div className="todo-card--container" style={{ backgroundColor: getTodoStatusColors(todo).backgroundColor }}>
      <div className="todo-card--action" onClick={onClick}>
        {getTodoStatus(todo) === TodoStatus.COMPLETED && (
          <Approved className="todo-card--icon-small" fill={color.backgroundLight} />
        )}
        {getTodoStatus(todo) === TodoStatus.IN_PROGRESS && (
          <InProgress className="todo-card--icon" fill={color.primary} />
        )}
        {getTodoStatus(todo) === TodoStatus.OVERDUE && <Bell className="todo-card--icon" fill={color.primary} />}
        <label className="todo-card--content" htmlFor={`radio-${todo.task}`}>
          <p className="todo-card--task" style={{ color: getTodoStatusColors(todo).labelColor }}>
            {todo.task}
          </p>
          <p className="todo-card--due" style={{ color: getTodoStatusColors(todo).dueDateColor }}>
            {new Date(todo.dueDate.toMillis()).toDateString().toString()}
          </p>
        </label>
      </div>
      {getTodoStatus(todo) !== TodoStatus.COMPLETED && (
        <Delete className="todo-card--delete" fill={getTodoStatusColors(todo).deleteColor} onClick={onDelete} />
      )}
    </div>
  );
};

export { TodoCard };

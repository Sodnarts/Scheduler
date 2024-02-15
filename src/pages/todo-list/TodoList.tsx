import './TodoList.styles.scss';
import { TodoCard } from '../../components/todo-card/TodoCard';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '../../components/buttons/ActionButton';
import { routes } from '../../constants/routes';
import { useHouseholdContext } from '../../hooks/useHouseholdContext';
import { Todo } from '../../types/Household';
import { Loader } from '../../components/loader/Loader';
import { TodoStatus, getTodoStatus } from '../../utils/getTodoStatus';
import { useEffect, useState } from 'react';

const TodoList = () => {
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const { household, updateHousehold } = useHouseholdContext();
  const navigate = useNavigate();

  useEffect(() => {
    const curr = new Date();
    curr.setDate(new Date().getDate() - 2);
    curr.setHours(23, 59, 59);
    setFilterDate(curr);
  }, []);

  if (!household) return <Loader />;

  const onClick = (todo: Todo) => {
    household.todos = household.todos.filter((t) => t.id !== todo.id);
    household.todos.push({ ...todo, completed: !todo.completed });

    updateHousehold(household);
  };

  const onDelete = (todo: Todo) => {
    household.todos = household.todos.filter((t) => t.id !== todo.id);
    updateHousehold(household);
  };

  return (
    <div className="todo-list--container">
      {!!household.todos.filter((t) => getTodoStatus(t) === TodoStatus.OVERDUE).length && (
        <p className="todo-list--section">Overdue</p>
      )}
      {household.todos
        .sort((a, b) => a.dueDate.toMillis() - b.dueDate.toMillis())
        .filter((t) => getTodoStatus(t) === TodoStatus.OVERDUE)
        .map((t) => (
          <TodoCard key={t.id} onClick={() => onClick(t)} onDelete={() => onDelete(t)} todo={t} />
        ))}

      {!!household.todos.filter(
        (t) => getTodoStatus(t) === TodoStatus.COMPLETED && t.dueDate.toMillis() > filterDate.getTime()
      ).length && <p className="todo-list--section">Completed</p>}
      {household.todos
        .sort((a, b) => a.dueDate.toMillis() - b.dueDate.toMillis())
        .filter((t) => getTodoStatus(t) === TodoStatus.COMPLETED && t.dueDate.toMillis() > filterDate.getTime())
        .map((t) => (
          <TodoCard key={t.id} onClick={() => onClick(t)} onDelete={() => onDelete(t)} todo={t} />
        ))}

      {!!household.todos.filter((t) => getTodoStatus(t) === TodoStatus.IN_PROGRESS).length && (
        <p className="todo-list--section">Todo</p>
      )}
      <div className="todo-list--list">
        {household.todos
          .sort((a, b) => a.dueDate.toMillis() - b.dueDate.toMillis())
          .filter((t) => getTodoStatus(t) === TodoStatus.IN_PROGRESS)
          .map((t) => (
            <TodoCard key={t.id} onClick={() => onClick(t)} onDelete={() => onDelete(t)} todo={t} />
          ))}
      </div>

      <ActionButton onClick={() => navigate(routes.createTodo)} />
    </div>
  );
};

export { TodoList };

import { color } from '../constants/color';
import { Todo } from '../types/Household';

enum TodoStatus {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  OVERDUE = 2,
}

const getTodoStatus = (todo: Todo) => {
  const curr = new Date();
  curr.setDate(new Date().getDate() - 1);
  curr.setHours(23, 59, 59);

  if (todo.completed) return TodoStatus.COMPLETED;
  else if (!todo.completed && todo.dueDate.toMillis() > curr.getTime()) return TodoStatus.IN_PROGRESS;
  else return TodoStatus.OVERDUE;
};

const getTodoStatusColors = (todo: Todo) => {
  const status = getTodoStatus(todo);

  switch (status) {
    case TodoStatus.COMPLETED:
      return {
        backgroundColor: color.primaryDark,
        iconColor: color.backgroundLight,
        deleteColor: color.backgroundLight,
        labelColor: color.black,
        dueDateColor: color.black,
      };
    case TodoStatus.IN_PROGRESS:
      return {
        backgroundColor: color.backgroundLight,
        iconColor: color.primary,
        deleteColor: color.white,
        labelColor: color.white,
        dueDateColor: color.primary,
      };
    case TodoStatus.OVERDUE:
      return {
        backgroundColor: color.error,
        iconColor: color.primary,
        deleteColor: color.white,
        labelColor: color.white,
        dueDateColor: color.primary,
      };
  }
};

export { getTodoStatus, getTodoStatusColors, TodoStatus };

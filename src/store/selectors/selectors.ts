import { FilterItem, Task } from "../todoTypes"

const getCompletedTodos = (todos: Task[]) => {
  return todos && todos.length > 0 ? todos.filter((todo) => todo.completed) : [];
}

const filterTodos = (todos: Task[], todoFilter: FilterItem) => {
  if (todos && todos.length > 0) {
    return todoFilter === FilterItem.Completed 
    ? todos.filter((todo) => todo.completed) 
    : todos.filter((todo) => !todo.completed);
  }
  return [];
}

export { getCompletedTodos, filterTodos };

import TodoApp from "./todoApp";
import { connect } from "react-redux";
import { getCompletedTodos } from "../../store/selectors/selectors";
import { addTodo, clearCompleted, completeAllTodo, deleteTodo, editTodo, fetchTodos, toggleTodo } from "../../store/services/server";

const mapStateToProps = (state: any, ownProps: any) => {
  const { todos } = state;

  const completed = getCompletedTodos(todos);
  const activeCount = todos.length - completed.length;

  return { todos, completed, activeCount };
};

const mapDispatchToProps = {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  completeAllTodo,
  clearCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

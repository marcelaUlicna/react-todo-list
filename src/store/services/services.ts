import { Task } from "../todoTypes";
import { 
  GET_TODOS,
  ADD_TODO, 
  CLEAR_COMPLETED, 
  COMPLETE_ALL_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
} from "../actions/actions";

const initialState: Task[] = [];

const todos = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TODOS:
      return action.payload;
    case ADD_TODO:
      return state.concat(action.payload);
    case EDIT_TODO:
      const updatedTask: Task = action.payload;
      return state.map((todo) => todo.id === updatedTask.id ? updatedTask : todo);
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case COMPLETE_ALL_TODO:
      const completedTasks: Task[] = action.payload;
      return state.map((todo) => {
        const currentTask = completedTasks.find(task => task.id === todo.id);
        return currentTask ?? todo;
      });
    case CLEAR_COMPLETED:
      const deletedTasks: string[] = action.payload;
      return state.filter((todo) => !deletedTasks.includes(todo.id));
    default:
      return state.slice();
  }
};

export default todos;

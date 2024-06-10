import { 
  ADD_TODO, 
  CLEAR_COMPLETED, 
  COMPLETE_ALL_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
  GET_TODOS 
} from "../actions/actions";
import { Dispatch } from "redux";
import { Task } from "../todoTypes";

// const { REACT_APP_URL } = process.env;
const REACT_APP_URL = 'http://localhost:8080' || '';

const headers = {'Content-Type': 'application/json'};

export const fetchTodos = () => async (dispatch: Dispatch) => {
  return fetch(`${REACT_APP_URL}/tasks`)
    .then((response) => response.json())
    .then((payload) => {
      dispatch({ type: GET_TODOS, payload });
      return Promise.resolve();
    })
    .catch((error: Error) => { 
      console.log('Load todos failed. Error:', error);
      throw new Error("Load Todo list failed. Error: " + error.message);
    });
}

export const addTodo = (text: string) => async (dispatch: Dispatch) => {
  return fetch(`${REACT_APP_URL}/tasks`, { 
    method: 'POST', 
    headers,
    body: JSON.stringify({ text }),
  })
  .then((response) => response.json())
  .then((payload) => {
    dispatch(({ type: ADD_TODO, payload }))
  })
  .catch((error: Error) => {
    console.log('Add new task failed. Error:', error);
    throw new Error("Add new task failed. Error: " + error.message);
  });
}

export const editTodo = (id: string, text: string) => async (dispatch: Dispatch) => {
  return fetch(`${REACT_APP_URL}/tasks/${id}`, { 
    method: 'POST', 
    headers,
    body: JSON.stringify({ text }),
  })
  .then((response) => response.json())
  .then((payload) => {
    dispatch(({ type: EDIT_TODO, payload }))
  })
  .catch((error: Error) => {
    console.log('Update task failed. Error:', error);
    throw new Error("Update task failed. Error: " + error.message);
  });
}

export const deleteTodo = (id: string) => async (dispatch: Dispatch) => {
  return fetch(`${REACT_APP_URL}/tasks/${id}`, { 
    method: 'DELETE', 
    headers,
  })
  .then((response) => {
    if (response.status === 200) {
      dispatch(({ type: DELETE_TODO, id }));
    } else {
      throw new Error("Delete task failed. Status: " + response.status);
    }
  })
  .catch((error: Error) => {
    console.log('Delete task failed. Error:', error);
    throw new Error("Delete task failed. Error: " + error.message);
  });
}

export const toggleTodo = (id: string, complete: boolean) => async (dispatch: Dispatch) => {
  const action = complete ? 'complete' : 'incomplete'
  return fetch(`${REACT_APP_URL}/tasks/${id}/${action}`, { 
    method: 'POST', 
    headers,
  })
  .then((response) => response.json())
  .then((payload) => {
    dispatch(({ type: EDIT_TODO, payload }));
  })
  .catch((error: Error) => {
    console.log('Update task failed. Error:', error);
    throw new Error("Update task failed. Error: " + error.message);
  });
}

export const completeAllTodo = (ids: string[]) => async (dispatch: Dispatch) => {
  if (ids.length === 0) {
    return;
  }
  
  const completeTodoPromises = ids.map((id) => {
    return fetch(`${REACT_APP_URL}/tasks/${id}/complete`, {
      method: 'POST', 
      headers,
    })
    .then((response) => response.json())
    .then((payload) => {
      return Promise.resolve({status: 'success', payload});
    })
    .catch((error: Error) => {
      console.log('Complete some tasks failed. Error: ', error);
      return Promise.resolve({ status: 'error', message: "Complete some tasks failed. Error: " + error.message});
    })
  });

  return Promise.all(completeTodoPromises).then((values: any) => {
    const updatedTasks = values
      .filter((val: { status: string }) => val.status === 'success')
      .map((task: { payload: Task }) => task.payload);
    if (updatedTasks) {
      dispatch(({ type: COMPLETE_ALL_TODO, payload: updatedTasks }));
    }

    const failedTasks = values.filter((val: { status: string }) => val.status === 'error');
    if (failedTasks.length > 0) {
      throw new Error(failedTasks[0].message);
    }
  });
}

export const clearCompleted = (ids: string[]) => async (dispatch: Dispatch) => {
  if (ids.length === 0) {
    return;
  }

  const deleteTodoPromises = ids.map((id) => {
    return fetch(`${REACT_APP_URL}/tasks/${id}`, {
      method: 'DELETE', 
      headers,
    })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve({ status: 'success', message: '', id });
      }
      return Promise.resolve({ status: "error", message: 'Delete some tasks failed.' });
    })
    .catch((error: Error) => {
      console.log('Delete task failed. Error:', error);
      return Promise.resolve({ status: "error", id, message: 'Delete some tasks failed. Error: ' + error.message });
    })
  });

  return Promise.all(deleteTodoPromises).then((values: any) => {
    const deletedTaskIds = values
      .filter((val: { status: string }) => val.status === 'success')
      .map((val: { id: string }) => val.id);
    if (deletedTaskIds.length > 0) {
      dispatch(({ type: CLEAR_COMPLETED, payload: deletedTaskIds }));
    }

    const failedTasks = values.filter((val: { status: string }) => val.status === 'error');
    if (failedTasks.length > 0) {
      throw new Error(failedTasks[0].message);
    }
  });
}


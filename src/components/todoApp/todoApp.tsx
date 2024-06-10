import { useEffect, useState } from "react";
import { Alert } from 'antd';
import { Task } from "../../store/todoTypes";
import { List } from '../list';

interface TodoAppProps {
  todos: Task[];
  completed: Task[];
  activeCount: number;
  addTodo: (text: string) => Promise<void>,
  editTodo: (id: string, text: string) =>  Promise<void>,
  deleteTodo: (id: string) =>  Promise<void>,
  toggleTodo: (id: string, complete: boolean) =>  Promise<void>;
  completeAllTodo: (ids: string[]) =>  Promise<void>;
  clearCompleted: (ids: string[]) =>  Promise<void>;
  fetchTodos: () => Promise<void>;
}

const TodoApp = ({
  todos,
  activeCount,
  addTodo, 
  editTodo, 
  deleteTodo,
  toggleTodo,
  completeAllTodo,
  clearCompleted,
  fetchTodos
}: TodoAppProps) => {  
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTodos()
    .catch((err: Error) => {
      setShowError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  return (
    <div style={{ margin: '24px' }}>
      {showErrorMessage && <Alert 
        className='alert-banner' 
        message={showErrorMessage} 
        type="error" 
        showIcon 
        closable 
        afterClose={() => setShowError(null)}  
      />}
      <h3>Todo List</h3>
      <List 
        todos={todos} 
        activeCount={activeCount} 
        loading={loading}
        addTodo={addTodo} 
        editTodo={editTodo} 
        deleteTodo={deleteTodo} 
        toggleTodo={toggleTodo}
        completeAllTodo={completeAllTodo}
        clearCompleted={clearCompleted}
        showAlert={(message) => setShowError(message)}
      />
    </div>
  );
};

export default TodoApp;

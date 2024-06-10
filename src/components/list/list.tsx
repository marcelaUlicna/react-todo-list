import { useEffect, useState } from "react";
import { Action, FilterItem, Task, TaskItem } from "../../store/todoTypes";
import { Footer } from "../footer";
import { Header } from "../header";
import { Item } from "../item";
import { List as AntList } from 'antd';
import { filterTodos } from "../../store/selectors/selectors";

interface ListProps {
  todos: Task[];
  activeCount: number;
  loading: boolean;
  addTodo: (text: string) => Promise<void>,
  editTodo: (id: string, text: string) => Promise<void>,
  deleteTodo: (id: string) => Promise<void>,
  toggleTodo: (id: string, complete: boolean) => Promise<void>;
  completeAllTodo: (ids: string[]) => Promise<void>;
  clearCompleted: (ids: string[]) => Promise<void>;
  showAlert: (message: string) => void;
}

const List = ({ 
  todos, 
  activeCount, 
  loading,
  addTodo, 
  editTodo, 
  deleteTodo, 
  toggleTodo, 
  completeAllTodo, 
  clearCompleted,
  showAlert
}: ListProps) => {
  const [todoList, setTodoList] = useState<TaskItem[]>(todos as TaskItem[]);

  useEffect(() => {
    setTodoList(todos as TaskItem[]);
  }, [todos]);

  const addNewTask = () => {
    const newList = [...todoList, { id: '', text: '', completed: false, isNew: true }];
    setTodoList(newList);
  }

  const handleOnSave = (text: string) => {
    if (!text) {
      const newList = todoList.filter(item => !item.isNew);
      setTodoList(newList);
    } else {
      addTodo(text).catch((err: Error) => {
        showAlert(err.message);
        // remove added item from list
        const newList = todoList.filter(item => !item.isNew);
        setTodoList(newList);
      });
    }
  }

  const handleOnEdit = (id: string, text: string) => {
    editTodo(id, text).catch((err:Error) => { 
      showAlert(err.message);
    });
  }

  const handleDelete = (id: string) => {
    deleteTodo(id).catch((err:Error) => { 
      showAlert(err.message);
    });
  }

  const handleToggle = (id: string, complete: boolean) => {
    toggleTodo(id, complete).catch((err:Error) => { 
      showAlert(err.message);
    });
  }
  const handleCompleteAll = () => {
    completeAllTodo(todoList.filter(todo => !todo.completed).map(todo => todo.id)).catch((err:Error) => { 
      showAlert(err.message);
    });
  }

  const handleClearCommpleted = () => {
    clearCompleted(todoList.filter(todo => todo.completed).map(todo => todo.id)).catch((err:Error) => { 
      showAlert(err.message);
    });;
  }

  const handleHeaderAction = (selectedAction: Action) => {
    switch (selectedAction) {
      case Action.ShowAll:
        setTodoList(todos as TaskItem[]);
        break;
      case Action.ShowActive:
        const activeTasks = filterTodos(todos, FilterItem.Active);
        setTodoList(activeTasks as TaskItem[]);
        break;
      case Action.ShowCompleted:
        const completedTasks = filterTodos(todos, FilterItem.Completed);
        setTodoList(completedTasks as TaskItem[]);
        break;
      case Action.CompleteAll:
        handleCompleteAll();
        break;
      case Action.DeleteCompleted:
        handleClearCommpleted();
        break;
    }
  }

  return (
      <div>
          <AntList
            header={<Header 
              onAddTask={addNewTask} 
              onAction={handleHeaderAction} 
              disabled={todoList.some(t => t.isNew)} 
            />}
            footer={<Footer activeCount={activeCount} />}
            bordered
            loading={loading}
            dataSource={todoList}
            renderItem={(item) => <Item 
              todo={item} 
              onSave={handleOnSave} 
              onUpdate={handleOnEdit} 
              onDelete={handleDelete} 
              onToggle={handleToggle}
            />}
          />
      </div>
  );
};

export default List;

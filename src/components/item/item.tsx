import { Button, Checkbox, Input, List } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TaskItem } from "../../store/todoTypes";
import { BaseSyntheticEvent, useState } from "react";

interface ItemProps {
  todo: TaskItem;
  onSave: (text: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, complete: boolean) => void;
}

const Item = ({ todo, onSave, onUpdate, onDelete, onToggle }: ItemProps) => {
  const [editing, setEditing] = useState(todo.isNew);
  const [taskName, setTaskName] = useState(todo.text);
  const [requiredError, setRequired] = useState(false);

  const textChange = (e: BaseSyntheticEvent) => {
    setTaskName(e.target.value);
  }

  const saveItem = () => {
    if (todo.isNew) {
      onSave(taskName);
    } else {
      onUpdate(todo.id, taskName);
    }
    setEditing(false);
  }

  const handleOnBlur = () => {
    if (!!taskName || todo.isNew) {
      saveItem();
    } else {
      setRequired(true);
    }
  }

  const handleOnToggle = () => {
    onToggle(todo.id, !todo.completed);
  }

  const handleKey = (event: any) => {
    setRequired(false);
    // save item if user press Enter
    if(event.keyCode === 13) {
      saveItem();
    }
  }

  const handleCancelEdit = () => {
    setTaskName(todo.text);
    setEditing(false);
    setRequired(false);
  }

  const renderItem = () => (
    <>
      <Checkbox checked={todo.completed} onChange={handleOnToggle}></Checkbox>
      <div 
        className={todo.completed ? 'todo-item completed-item' : 'todo-item'} 
        onDoubleClick={() => setEditing(true)}
      >
        {todo.text}
      </div>
      <Button type="default" onClick={() => onDelete(todo.id)}>Delete</Button>
    </>
  );

  const renderTextInput = () => (
    <>
    <div className="task-name-input">
      <div>
        <Input 
          placeholder="Task name" 
          value={taskName} 
          onChange={textChange} 
          onBlur={handleOnBlur} 
          onKeyDown={handleKey} 
          autoFocus 
          status={requiredError ? "error" : ""}
        />
        <CloseOutlined onClick={handleCancelEdit} />
      </div>
      {requiredError && <div className="task-name-error">Task name is required.</div>}
    </div>
    </>
  );

  return (
    <List.Item>
      {editing ? renderTextInput() : renderItem()}
    </List.Item>
  );
};

export default Item;

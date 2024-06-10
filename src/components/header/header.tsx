import { Button, Dropdown, MenuProps, Space } from "antd";
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Action } from "../../store/todoTypes";

interface HeaderProps {
  onAddTask: () => void;
  onAction: (action: Action) => void;
  disabled: boolean;
}

const Header = ({ onAddTask, onAction, disabled }: HeaderProps) => {
  const handleActionClick = (value: any) => {
    let selectedAction = null;
    switch (value?.key) {
      case 'active':
        selectedAction = Action.ShowActive;
        break;
      case 'completed':
        selectedAction = Action.ShowCompleted;
        break;
      case 'all':
        selectedAction = Action.ShowAll;
        break;
      case 'completeAll':
        selectedAction = Action.CompleteAll;
        break;
      case 'deletteCompleted':
        selectedAction = Action.DeleteCompleted;
        break;
      default:
        console.error(`Invalid action ${value?.key}`);
        break;
    }

    if (selectedAction !== null) {
      onAction(selectedAction);
    }
  }

  const filterItems: MenuProps['items'] = [
    { label: 'Show active', key: 'active', },
    { label: 'Show completed', key: 'completed', },
    { label: 'Show all', key: 'all', },
  ];

  const actionItems: MenuProps['items'] = [
    { label: 'Complete all', key: 'completeAll', },
    { label: 'Delete completed', key: 'deletteCompleted', },
  ];

  return (
      <div className="header">
        <div>
          <Button 
            type="primary" 
            disabled={disabled} 
            icon={<PlusOutlined />} 
            onClick={onAddTask}
          >
            Add task
          </Button>
        </div>
        <div className="header-actions">
         <div>
          <Dropdown menu={{items: filterItems, onClick: handleActionClick}}>
            <Button>Filter <DownOutlined /></Button>
          </Dropdown>
         </div>
         <div>
          <Dropdown menu={{items: actionItems, onClick: handleActionClick}}>
            <Button>Actions <DownOutlined /></Button>
          </Dropdown>
         </div>
        </div>
      </div>
  );
};

export default Header;

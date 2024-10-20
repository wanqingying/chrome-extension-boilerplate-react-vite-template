import React, { useState } from 'react';
import { Checkbox, Input, Button } from '@/components/ui';
import { useTodoStore } from '@/store/todo';

interface TodoItemProps {
  todo: { id: string; title: string; done: boolean };
  // toggleTodo: (id: string) => void;
}

const TodoItemView: React.FC<TodoItemProps> = props => {
  const id = props.todo.id;
  console.log('render todo ', id);
  // const [isEditing, setIsEditing] = useState(false);
  const todo = useTodoStore(state => state.todos[id]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const updateTodo = useTodoStore(state => state.editTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  console.log('todo ', todo);

  const handleSave = () => {
    updateTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <li className="mb-2 flex items-center">
      <Checkbox checked={todo.done} onCheckedChange={() => toggleTodo(todo.id)} className="mr-2" />
      <div className={'inline-flex h-8 w-full'}>
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="mr-2 h-full w-full text-base font-medium"
            style={{ height: '2rem' }}
          />
        ) : (
          <div
            className={`flex-1 ${todo.done ? 'line-through' : ''} h-full w-full p-[1px] pl-[13px] text-base font-medium`}
            onDoubleClick={() => setIsEditing(true)}
            style={{ height: '2rem', lineHeight: '2rem' }}>
            {todo.title}
          </div>
        )}
        {isEditing && (
          <Button onClick={handleSave} className={'h-full'}>
            Save
          </Button>
        )}
      </div>
    </li>
  );
};

const TodoItem = React.memo(TodoItemView);
// const TodoItem = TodoItemView;

export { TodoItem };

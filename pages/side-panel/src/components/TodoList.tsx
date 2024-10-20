import React, { useCallback, useState } from 'react';
import { useTodoStore } from '@/store/todo';
import { Button, Input } from '@/components/ui';
import { TodoItem } from './TodoItem';

const TodoListView: React.FC = () => {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  }, [newTodo]);
  console.log('render todo list');
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <ul>
        {Object.values(todos).map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="mt-4 flex">
        <Input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Add new todo" className="mr-2" />
        <Button onClick={handleAddTodo}>Add Todo</Button>
        <Button
          onClick={e => {
            chrome.runtime.sendMessage({ action: 'fetchHtml' }, response => {
              console.log('response', response);
            });
          }}>
          get html
        </Button>
      </div>
    </div>
  );
};
const TodoList = React.memo(TodoListView, (prev, next) => {
  return false;
});

export { TodoList };

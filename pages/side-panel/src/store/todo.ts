import { useStore } from 'zustand';
import { createStore, StoreApi } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

type State = {
  todos: Record<string, Todo>;
  toggleTodo: (todoId: string) => any;
  addTodo: (title: string) => any;
  editTodo: (id: string, title: string) => any;
};

// type Actions = {
//   toggleTodo: (todoId: string) => void;
//   addTodo: (title: string) => void;
// };

export const todoStore = createStore<State>()(
  immer<State>(set => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
    },
    toggleTodo: (todoId: string) => {
      set(state => {
        state.todos[todoId].done = !state.todos[todoId].done;
      });
    },
    addTodo: (title: string) => {
      set(state => {
        const id = uuidv4();
        state.todos[id] = { id, title, done: false };
      });
    },
    editTodo: (todoId: string, title: string) => {
      set(state => {
        state.todos[todoId].title = title;
      });
    },
  })),
);

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;
type ReadonlyStoreApi<T> = Pick<StoreApi<T>, 'getState' | 'getInitialState' | 'subscribe'>;

export type SelectorFn<S extends ReadonlyStoreApi<unknown>, U> = (state: ExtractState<S>) => U;

export function useTodoStore<U = typeof todoStore>(selector?: SelectorFn<typeof todoStore, U>) {
  return useStore(todoStore, selector || (state => state as U));
}

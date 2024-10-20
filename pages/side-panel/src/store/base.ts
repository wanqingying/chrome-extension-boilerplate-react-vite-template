import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer'

interface State {
  bears: number;
  increase: () => void;
  decrease: () => void;
}

const store = createStore<State>(set => ({
  bears: 1,
  increase: () => set(state => ({ bears: state.bears + 1 })),
  decrease: () => set(state => ({ bears: state.bears - 1 })),
}));
const { getState, setState, subscribe, getInitialState } = store;

export default store;

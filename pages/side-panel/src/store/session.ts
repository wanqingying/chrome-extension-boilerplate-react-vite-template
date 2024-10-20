import { useStore } from 'zustand';
import { createStore, StoreApi } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuid } from 'uuid';
import { kit } from '@/type';
import { useEffect, useMemo } from 'react';

export const sessionStore = createStore<kit.session.StoreType>()(
  immer<kit.session.StoreType>(set => ({
    sessions: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        topic: '',
        stat: {
          tokenCount: 0,
          wordCount: 0,
          charCount: 0,
        },
        lastUpdate: Date.now(),
        mask: {} as any,
        memoryPrompt: '',
        messages: ['b98547e01a3e', 'b98547e01a3c', 'b98547e01a3h'],
      },
    },
    messages: {
      b98547e01a3e: {
        id: 'b98547e01a3e',
        model: 'gpt-4o-mini',
        stream: true,
        response_format: {
          type: 'text',
        },
        role: 'system',
        content: '',
        createAt: Date.now(),
      },
      b98547e01a3c: {
        id: 'b98547e01a3c',
        model: 'gpt-4o-mini',
        stream: true,
        response_format: {
          type: 'text',
        },
        role: 'user',
        content: 'hello',
        createAt: Date.now(),
        finished: true,
      },
      b98547e01a3h: {
        id: 'b98547e01a3h',
        model: 'gpt-4o-mini',
        stream: true,
        response_format: {
          type: 'text',
        },
        role: 'assistant',
        content: 'how cani help you',
        createAt: Date.now(),
        finished: true,
      },
    },
    activeChatId: 'b98547e01a3e',
    activeSessionId: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
    hasInit: false,
    messageIds: [],
    toggleTodo: (todoId: string) => {
      set(state => {
        // state.todos[todoId].done = !state.todos[todoId].done;
      });
    },
    addTodo: (title: string) => {
      set(state => {
        const id = uuid();
        // state.todos[id] = { id, title, done: false };
      });
    },
    addUserText: (text: string) => {
      set(state => {
        const userId = uuid();
        const aiId = uuid();
        const { activeSessionId } = state;
        state.messages[userId] = {
          role: 'user',
          name: '',
          content: text,
          stream: true,
          model: 'gpt-4o-mini',
          createAt: Date.now(),
          id: userId,
          linkId: aiId,
          finished: true,
        };
        state.messages[aiId] = {
          role: 'assistant',
          name: '',
          content: '',
          stream: true,
          model: 'gpt-4o-mini',
          createAt: Date.now() + 5,
          id: aiId,
          linkId: userId,
          finished: false,
        };
        state.chatApi(aiId, state.messages[userId]);
      });
    },
    addUserTextTest: (text: string) => {
      set(state => {
        const userId = uuid();
        const { activeSessionId } = state;
        state.messages[userId] = {
          role: 'user',
          name: '',
          content: text,
          stream: true,
          model: 'gpt-4o-mini',
          createAt: Date.now(),
          id: userId,
          linkId: '',
          finished: true,
        };
      });
    },
    init: () => {
      set(state => {
        state.addUserTextTest('aaa');
        state.addUserTextTest('bbb');
        state.hasInit = true;
      });
    },

    chatApi: (aiId: string, user) => {
      const p = new URLSearchParams({
        content: String(user.content),
      });
      // 创建一个 EventSource 实例，指向你的 sse 接口
      const eventSource = new EventSource(`http://localhost:3004/chat/sse-chat?${p.toString()}`);

      // 监听 message 事件
      eventSource.onmessage = function (event) {
        const data = event.data;
        if (data === 'SSE_END_OF_STREAM') {
          set(state => {
            state.messages[aiId].finished = true;
          });
          return eventSource.close();
        }
        set(state => {
          const { activeSessionId } = state;
          state.messages[aiId].content += String(data);
        });
      };

      // 监听错误事件
      eventSource.onerror = function (event) {
        console.error('EventSource failed:', event);
      };
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

export function useSessionStore<U = typeof sessionStore>(selector?: SelectorFn<typeof sessionStore, U>) {
  return useStore(sessionStore, selector || (state => state as U));
}

export function useActiveSession() {
  const id = useSessionStore(s => s.activeSessionId);
  const sessions = useSessionStore(s => s.sessions);

  return sessions[id];
}

export function useViewMessageList() {
  const messages = useSessionStore(s => {
    return s.messages;
  });
  const activeId = useSessionStore(s => {
    return s.activeSessionId;
  });
  const init = useSessionStore(s => s.init);
  const hasInit = useSessionStore(s => s.hasInit);
  useEffect(() => {
    if (!hasInit) {
      // console.log('init');
      // init();
    }
  }, [hasInit]);
  const chats = Array.from(Object.values(messages))
    .filter(t => {
      return ['user', 'assistant'].includes(t.role);
    })
    .sort((a, b) => {
      return a.createAt - b.createAt;
    });
  return useMemo(() => {
    return chats;
  }, [activeId, chats.map(t => t.id + String(t.finished)).join('&')]);
}

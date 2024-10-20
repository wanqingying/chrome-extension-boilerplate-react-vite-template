import { ModelConfig } from '@/utils/config';
import { AllLang } from '@/locales';
import type { OpenAI } from 'openai';

export const ROLES = ['system', 'user', 'assistant'] as const;
export type MessageRole = (typeof ROLES)[number];

export const Models = ['gpt-3.5-turbo', 'gpt-4'] as const;
export const TTSModels = ['tts-1', 'tts-1-hd'] as const;
export type ChatModel = string;

export interface MultimodalContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface RequestMessage {
  role: MessageRole;
  content: string | MultimodalContent[];
}

export namespace kit {
  export namespace session {
    interface Todo {
      id: string;
      title: string;
      done: boolean;
    }

    export interface Mask {
      id: string;
      createdAt: number;
      avatar: string;
      name: string;
      hideContext?: boolean;
      context: any[]; // chat message
      syncGlobalConfig?: boolean;
      modelConfig: ModelConfig;
      lang: keyof typeof AllLang;
      builtin?: boolean;
      plugin?: string[];
      enableArtifacts?: boolean;
      enableCodeFold?: boolean;
    }

    export interface ChatStat {
      tokenCount: number;
      wordCount: number;
      charCount: number;
    }
    export type GMessage = {
      id: string;
      model: OpenAI.ChatModel;
      response_format?: { type: 'text' };
      stream: true;
      createAt: number;
      finishAt?: number;
      finished?: boolean;
      linkId?: string;
    } & OpenAI.ChatCompletionMessageParam;

    export interface ChatSession {
      id: string;
      topic: string;
      memoryPrompt: string;
      messages: string[];
      stat: ChatStat;
      lastUpdate: number;
      // lastSummarizeIndex: number;
      // clearContextIndex?: number;
      mask: Mask;
    }

    export type State = {
      sessions: Record<string, ChatSession>;
      // messageIds: string[];
      messages: Record<string, GMessage>;
      // chats: Record<any, GPTChat>;
      activeSessionId: string;
      // activeAiChat?: GMessage;
      hasInit: boolean;
    };

    export type Actions = {
      toggleTodo: (todoId: string) => void;
      addTodo: (title: string) => void;
      init: () => void;
      addUserText: (text: string) => void;
      addUserTextTest: (text: string) => void;
      chatApi: (id: string, user: GMessage) => void;
    };

    export type StoreType = State & Actions;
  }
}

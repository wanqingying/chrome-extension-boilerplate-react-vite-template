import {
  DEFAULT_MODELS,
  DEFAULT_TTS_MODELS,
  DEFAULT_TTS_ENGINES,
  DEFAULT_TTS_VOICE,
  DEFAULT_TTS_VOICES,
  DEFAULT_SIDEBAR_WIDTH,
  ServiceProvider,
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_TTS_ENGINE,
  DEFAULT_TTS_MODEL,
  DalleStyle,
  DalleSize,
  DalleQuality,
} from './const';

export type ModelType = (typeof DEFAULT_MODELS)[number]['name'];
export type TTSModelType = (typeof DEFAULT_TTS_MODELS)[number];
export type TTSVoiceType = (typeof DEFAULT_TTS_VOICES)[number];
export type TTSEngineType = (typeof DEFAULT_TTS_ENGINES)[number];

export enum SubmitKey {
  Enter = 'Enter',
  CtrlEnter = 'Ctrl + Enter',
  ShiftEnter = 'Shift + Enter',
  AltEnter = 'Alt + Enter',
  MetaEnter = 'Meta + Enter',
}

export enum Theme {
  Auto = 'auto',
  Dark = 'dark',
  Light = 'light',
}

export interface LLMUsage {
  used: number;
  total: number;
}

export interface LLMModel {
  name: string;
  displayName?: string;
  available: boolean;
  provider: LLMModelProvider;
  sorted: number;
}

export interface LLMModelProvider {
  id: string;
  providerName: string;
  providerType: string;
  sorted: number;
}

export const DEFAULT_CONFIG = {
  lastUpdate: Date.now(), // timestamp, to merge state

  submitKey: SubmitKey.Enter,
  avatar: '1f603',
  fontSize: 14,
  fontFamily: '',
  theme: Theme.Auto as Theme,
  // tightBorder: !!config?.isApp,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,

  enableArtifacts: true, // show artifacts config

  enableCodeFold: true, // code fold config

  disablePromptHint: false,

  dontShowMaskSplashScreen: false, // dont show splash screen when create chat
  hideBuiltinMasks: false, // dont add builtin masks

  customModels: '',
  models: DEFAULT_MODELS as any as LLMModel[],

  modelConfig: {
    model: 'gpt-4o-mini' as ModelType,
    providerName: 'OpenAI' as ServiceProvider,
    temperature: 0.5,
    top_p: 1,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    compressModel: '',
    compressProviderName: '',
    enableInjectSystemPrompts: true,
    template: DEFAULT_INPUT_TEMPLATE,
    size: '1024x1024' as DalleSize,
    quality: 'standard' as DalleQuality,
    style: 'vivid' as DalleStyle,
  },

  ttsConfig: {
    enable: false,
    autoplay: false,
    engine: DEFAULT_TTS_ENGINE,
    model: DEFAULT_TTS_MODEL,
    voice: DEFAULT_TTS_VOICE,
    speed: 1.0,
  },
};
export type ChatConfig = typeof DEFAULT_CONFIG;

export type ModelConfig = ChatConfig["modelConfig"];
export type TTSConfig = ChatConfig["ttsConfig"];


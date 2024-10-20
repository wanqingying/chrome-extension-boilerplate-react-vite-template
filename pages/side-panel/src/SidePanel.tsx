import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { Toaster } from '@/components/ui/toaster';
import { TodoList } from '@/components/TodoList';

import { ChatInputText } from './pages/chat/components/ChatInputText';
import React, { useEffect } from 'react';

const AppSidePanel = () => {
  // 监听系统主题变化
  useEffect(() => {
    // 检查系统是否处于暗色模式
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      console.log('handleThemeChange', e);
      document.documentElement.classList.toggle('dark', e.matches);
      document.documentElement.classList.toggle('light', lightModeMediaQuery.matches);
    };

    // 初始化主题
    handleThemeChange(darkModeMediaQuery);

    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);
  return (
    <div className={`relative flex h-screen flex-col bg-slate-100 p-1 overflow-hidden`}>
      <div className='text-white bg-blue-500 p-2'>
        start demo
      </div>
      <TodoList />
      <ChatInputText className={'h-full flex-1 rounded-xl bg-white'} />
      <Toaster />
    </div>
  );
};

export default withErrorBoundary(withSuspense(AppSidePanel, <div> Loading ... </div>), <div> Error Occur </div>);

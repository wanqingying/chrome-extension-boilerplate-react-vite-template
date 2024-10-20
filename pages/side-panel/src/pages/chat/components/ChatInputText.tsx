import React, { useState, useRef, useEffect, useCallback } from 'react';
// import BrainIcon from '@src/icons/brain.svg';
// import SendWhiteIcon from '@src/icons/send-white.svg';
import { SendWhiteIcon, BrainIcon } from '@src/icons';
import { IconButton } from '@src/components/button/IconButton';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/ui/button';
import { Markdown } from '@/components/markdown/markdown';
import { debounce, set } from 'lodash';
import { useSessionStore } from '@/store/session';
import { MessageListMemo } from './MessageList';

// import dynamic from "next/dynamic";
// import { useNavigate } from "react-router-dom";

// const Markdown = dynamic(async () => (await import("./markdown")).Markdown, {
//   loading: () => <LoadingIcon />,
// });

interface IProps {
  className?: string;
  // session: kit.session.ChatSession;
}

export function ChatInputText(props: IProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const eleRef = useRef<HTMLDivElement>(null);
  const sessions = useSessionStore(s => s.sessions);
  React.useEffect(() => {
    // testSse(eleRef)
  }, []);
  const [text, setText] = useState('');
  const textRef = useRef('');
  const addUserText = useSessionStore(s => s.addUserText);

  const updateText = useCallback(
    debounce(() => {
      setText(prev => prev + textRef.current);
      textRef.current = '';
    }, 20),
    [],
  );

  function testSse(eleRef: React.MutableRefObject<HTMLDivElement | null>) {
    // 创建一个 EventSource 实例，指向你的 sse 接口
    const eventSource = new EventSource('http://localhost:3004/chat/sse-chat');

    // 监听 message 事件
    eventSource.onmessage = function (event) {
      const data = event.data;
      if (data === 'SSE_END_OF_STREAM') {
        eventSource.close();
        return;
      }
      const ele = eleRef.current;
      if (ele) {
        // ele.innerText += String(data);
      }
      // textRef.current += String(data);
      // updateText();
      setText(prev => prev + String(data));
    };

    // 监听错误事件
    eventSource.onerror = function (event) {
      console.error('EventSource failed:', event);
    };
  }

  useEffect(() => {
    // let tx = 0;
    // const timer = setInterval(() => {
    //   if (tx > 10) {
    //     setText(prev => prev + exampleTxt);
    //     return clearInterval(timer);
    //   }
    //   setText(prev => prev + '1');
    //   tx++;
    // }, 500);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  return (
    <div className={twMerge('relative flex h-full flex-col overflow-hidden', props.className)}>
      <MessageListMemo className={'h-[calc(100% - 100px)]'} />

      <div className="border-light relative flex h-[100px] w-full flex-col">
        <label className="relative flex w-full flex-col px-3">
          <textarea
            className={twMerge(
              'textarea h-20 w-full rounded-lg border border-slate-200 p-4 transition duration-200',
              'hover:border-slate-300 focus:shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] focus:outline-none',
              'bg-white text-sm font-medium text-slate-700',
              'resize-none',
            )}
            placeholder="请输入内容2..."
            ref={ref}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                addUserText(ref.current!.value);
                ref.current!.value = '';
              }
            }}
          />
          <IconButton
            icon={<SendWhiteIcon className={'text-slate-700'} />}
            // text="Send"
            className="absolute bottom-3 right-[22px] rounded-lg bg-slate-200 hover:bg-slate-300"
            type="primary"
            onClick={() => {
              addUserText(ref.current!.value);
              ref.current!.value = '';
            }}
          />
        </label>
      </div>
    </div>
  );
}

function PromptToast(props: { showToast?: boolean; showModal?: boolean; setShowModal: (_: boolean) => void }) {
  return (
    <div className="z-999 absolute bottom-[-50px] flex w-[calc(100%-40px)] justify-center">
      {props.showToast && (
        <div
          className="clickable border-light shadow-card flex items-center justify-center rounded-full border bg-white p-2.5 text-sm text-black"
          role="button"
          onClick={() => props.setShowModal(true)}>
          <BrainIcon />
          <span className="ml-2.5"></span>
        </div>
      )}
      {/*{props.showModal && (*/}
      {/*  <SessionConfigModel onClose={() => props.setShowModal(false)} />*/}
      {/*)}*/}
    </div>
  );
}

export function ChatAction(props: { text: string; icon: JSX.Element; onClick: () => void }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState({
    full: 16,
    icon: 16,
  });

  function updateWidth() {
    if (!iconRef.current || !textRef.current) return;
    const getWidth = (dom: HTMLDivElement) => dom.getBoundingClientRect().width;
    const textWidth = getWidth(textRef.current);
    const iconWidth = getWidth(iconRef.current);
    setWidth({
      full: textWidth + iconWidth,
      icon: iconWidth,
    });
  }

  return (
    <div
      className="clickable border-light shadow-card transition-width ease inline-flex h-4 items-center overflow-hidden rounded-2xl border bg-white p-1.5 text-xs text-black duration-300"
      onClick={() => {
        props.onClick();
        setTimeout(updateWidth, 1);
      }}
      onMouseEnter={updateWidth}
      onTouchStart={updateWidth}
      style={
        {
          '--icon-width': `${width.icon}px`,
          '--full-width': `${width.full}px`,
        } as React.CSSProperties
      }>
      <div ref={iconRef} className="flex items-center justify-center">
        {props.icon}
      </div>
      <div
        className="ease pointer-events-none flex -translate-x-1 transform items-center justify-center pl-1.5 opacity-0 transition-all duration-300"
        ref={textRef}>
        {props.text}
      </div>
    </div>
  );
}

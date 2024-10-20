import React, { FC, useRef, useEffect } from 'react';
import { MessageMemo } from './Message';
import { MessageActiveMemo } from './MessageActive';
import { useViewMessageList } from '@/store/session';
import { twMerge } from 'tailwind-merge';
import { kit } from '@/type';
import { Avatar } from './Avatar';
import AiSvg from '@/icons/black-bot.svg';

interface IProps {
  className?: string;
  // messages: kit.session.GMessage[];
}

const MessageList: FC<IProps> = function (_props) {
  const messages = useViewMessageList();
  console.log('render MessageList');
  const listRef = useRef<HTMLDivElement>(null);
  if (listRef.current) {
    console.log('scroll to end');
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }
  console.log('messages', messages);
  return (
    <div
      className={twMerge(
        'relative flex-1 overflow-auto overflow-x-hidden p-5 pb-10',
        //xx
        'flex flex-col gap-3',
        _props.className,
      )}
      ref={listRef}>
      {messages.map((m, index) => {
        return <MessageView message={m} key={m.id} />;
      })}
    </div>
  );
};
interface IProps2 {
  className?: string;
  message: kit.session.GMessage;
}

const MessageView: FC<IProps2> = function (_props) {
  const m = _props.message;
  if (m.finished) {
    return (
      <div className={twMerge('w-full', m.role === 'user' ? 'text-right' : 'flex flex-col text-left')}>
        <MessageAiHeaderView message={m} />
        <MessageMemo
          message={m}
          key={m.id}
          // textClassName={twMerge('', m.role === 'user' ? 'text-' : 'text-black')}
          className={twMerge('inline-block', m.role === 'user' ? 'bg-slate-100 text-right' : 'bg-white text-left')}
        />
      </div>
    );
  } else {
    return (
      <div className={twMerge('w-full', m.role === 'user' ? 'text-right' : 'flex flex-col text-left')}>
        <MessageAiHeaderView message={m} />
        <MessageActiveMemo
          message={m}
          key={m.id}
          className={twMerge('inline-block', m.role === 'user' ? 'bg-slate-100 text-right' : 'bg-white text-left')}
        />
      </div>
    );
  }
};

const MessageAiHeaderView: FC<IProps2> = function (_props) {
  const { message } = _props;
  if (message.role !== 'assistant') return null;
  return (
    <div className={'inline-flex items-center gap-1'}>
      <Avatar src={AiSvg} className={'h-6 w-6'} />
      <span className={'text-sm font-semibold'}>{message.model}</span>
    </div>
  );
};

export const MessageListMemo = React.memo(MessageList);

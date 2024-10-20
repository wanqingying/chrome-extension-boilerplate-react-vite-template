import React, { FC } from 'react';
import { Markdown } from '@/components/markdown/markdown';
import { kit } from '@/type';
import { useActiveSession, useSessionStore } from '@/store/session';
import { twMerge } from 'tailwind-merge';

interface IProps {
  className?: string;
  message: kit.session.GMessage;
}

const MessageActive: FC<IProps> = function (_props) {
  const session = useActiveSession();
  const id = _props.message.id;
  const message = useSessionStore(s => s.messages[id]);
  // console.log('render MessageActive ', id);
  return (
    <div className={twMerge('rounded-md bg-slate-200 p-2', _props.className)}>
      <Markdown content={message.content as string} loading={false} />
    </div>
  );
};

export const MessageActiveMemo = React.memo(MessageActive);

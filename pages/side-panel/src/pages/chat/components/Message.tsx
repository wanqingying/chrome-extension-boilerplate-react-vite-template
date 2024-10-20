import React, { FC } from 'react';
import { Markdown } from '@/components/markdown/markdown';
import { kit } from '@/type';
import { twMerge } from 'tailwind-merge';
import {Avatar} from './Avatar'


interface IProps {
  className?: string;
  textClassName?: string;
  message: kit.session.GMessage;
}

const Message: FC<IProps> = function (_props) {
  return (
    <div className={twMerge('rounded-md p-2', _props.className)}>
      <Markdown content={_props.message.content as string} loading={false} className={_props.textClassName} />
    </div>
  );
};

export const MessageMemo = React.memo(Message, (prev, next) => {
  return prev.message.content === next.message.content;
});

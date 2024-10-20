// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar as SdcAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import React, { FC } from 'react';

type SdcAvatarProps = React.ComponentProps<typeof SdcAvatar>;

type IProps = SdcAvatarProps & {
  src: any;
  source?: 'svg' | 'image';
  alt?: string;
  fallback?: any;
};

export const Avatar: FC<IProps> = function (props) {
  const { src, source, alt } = props;
  return (
    <SdcAvatar {...props}>
      {source === 'svg' ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%' }} />
      ) : (
        <AvatarImage src={src} alt={alt} />
      )}
      <AvatarFallback>{props.fallback || 'Avatar'}</AvatarFallback>
    </SdcAvatar>
  );
};

//
// const Avatar = ({ src, alt, ...props }) => {
//
// };

export default Avatar;

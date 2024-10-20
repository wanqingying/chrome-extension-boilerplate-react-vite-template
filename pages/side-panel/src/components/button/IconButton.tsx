import * as React from 'react';
import { CSSProperties } from 'react';

export type ButtonType = 'primary' | 'danger' | null;

export function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  style?: CSSProperties;
  aria?: string;
}) {
  const baseClasses =
    'flex items-center justify-center p-2 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden select-none outline-none border-none';
  const typeClasses = {
    primary: 'bg-primary text-white',
    danger: 'text-red-800 border-red-500 bg-red-50 hover:border-red-600 hover:bg-red-100',
  };
  const disabledClasses = 'cursor-not-allowed opacity-50';
  const hoverFocusClasses = 'hover:border-primary focus:border-primary';
  const shadowClasses = 'shadow';
  const borderClasses = 'border';

  return (
    <button
      className={`${baseClasses} ${props.bordered ? borderClasses : ''} ${props.shadow ? shadowClasses : ''} ${props.className ?? ''} ${props.disabled ? disabledClasses : ''} ${props.type ? typeClasses[props.type] : ''} ${hoverFocusClasses}`}
      onClick={props.onClick}
      title={props.title}
      disabled={props.disabled}
      role="button"
      tabIndex={props.tabIndex}
      autoFocus={props.autoFocus}
      style={props.style}
      aria-label={props.aria}>
      {props.icon && (
        <div
          aria-label={props.text || props.title}
          className={`w-4 h-4 flex justify-center items-center ${props.type === 'primary' && 'no-dark'}`}>
          {props.icon}
        </div>
      )}

      {props.text && (
        <div
          aria-label={props.text || props.title}
          className="text-xs overflow-hidden text-ellipsis whitespace-nowrap ml-1">
          {props.text}
        </div>
      )}
    </button>
  );
}

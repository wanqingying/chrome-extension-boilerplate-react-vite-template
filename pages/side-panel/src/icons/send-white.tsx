import React from 'react';
import { IconProps } from './def';

// export const SendWhiteIcon: React.FC = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     xmlnsXlink="http://www.w3.org/1999/xlink"
//     width="16"
//     height="16"
//     fill="none"
//     viewBox="0 0 16 16">
//     <defs>
//       <rect id="path_0" width="16" height="16" x="0" y="0" />
//     </defs>
//     <g opacity="1" transform="translate(0 0) rotate(0 8 8)">
//       <mask id="bg-mask-0" fill="#fff">
//         <use xlinkHref="#path_0" />
//       </mask>
//       <g mask="url(#bg-mask-0)">
//         <path
//           id="路径 1"
//           style={{ stroke: '#fff', strokeWidth: 1.3333333333333333, strokeOpacity: 1, strokeDasharray: '0 0' }}
//           d="M0,4.71L6.67,6L8.34,12.67L12.67,0L0,4.71Z"
//           transform="translate(1.3333333333333333 2) rotate(0 6.333333333333333 6.333333333333333)"
//         />
//         <path
//           id="路径 2"
//           style={{ stroke: '#fff', strokeWidth: 1.3333333333333333, strokeOpacity: 1, strokeDasharray: '0 0' }}
//           d="M0,1.89L1.89,0"
//           transform="translate(8.002766666666666 6.1172) rotate(0 0.9428000000000001 0.9428000000000001)"
//         />
//       </g>
//     </g>
//   </svg>
// );

export const SendWhiteIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
        ref={forwardedRef}>
        <defs>
          <rect id="path_0" width="16" height="16" x="0" y="0" />
        </defs>
        <g opacity="1" transform="translate(0 0) rotate(0 8 8)">
          <mask id="bg-mask-0" fill="#fff">
            <use xlinkHref="#path_0" />
          </mask>
          <g mask="url(#bg-mask-0)">
            <path
              id="路径 1"
              // color={color}
              stroke={color}
              strokeWidth={1.3333333333333333}
              style={{ strokeWidth: 1.3333333333333333, strokeOpacity: 1, strokeDasharray: '0 0' }}
              d="M0,4.71L6.67,6L8.34,12.67L12.67,0L0,4.71Z"
              transform="translate(1.3333333333333333 2) rotate(0 6.333333333333333 6.333333333333333)"
            />
            <path
              id="路径 2"
              style={{ stroke: color, strokeWidth: 1.3333333333333333, strokeOpacity: 1, strokeDasharray: '0 0' }}
              d="M0,1.89L1.89,0"
              transform="translate(8.002766666666666 6.1172) rotate(0 0.9428000000000001 0.9428000000000001)"
            />
          </g>
        </g>
      </svg>
    );
  },
);

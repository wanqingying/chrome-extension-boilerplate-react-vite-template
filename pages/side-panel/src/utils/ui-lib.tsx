import { CSSProperties, useRef } from 'react';

export function showImageModal(img: string, defaultMax?: boolean, style?: CSSProperties, boxStyle?: CSSProperties) {
  // showModal({
  //   title: Locale.Export.Image.Modal,
  //   defaultMax: defaultMax,
  //   children: (
  // 	<div style={{ display: "flex", justifyContent: "center", ...boxStyle }}>
  // 	  <img
  // 		src={img}
  // 		alt="preview"
  // 		style={
  // 		  style ?? {
  // 			maxWidth: "100%",
  // 		  }
  // 		}
  // 	  ></img>
  // 	</div>
  //   ),
  // });
}

export function FullScreen(props: any) {
  const { children, right = 10, top = 10, ...rest } = props;
  const ref = useRef<HTMLDivElement>();
  // const [fullScreen, setFullScreen] = useState(false);
  // const toggleFullscreen = useCallback(() => {
  //   if (!document.fullscreenElement) {
  // 	ref.current?.requestFullscreen();
  //   } else {
  // 	document.exitFullscreen();
  //   }
  // }, []);
  // useEffect(() => {
  //   const handleScreenChange = (e: any) => {
  // 	if (e.target === ref.current) {
  // 	  setFullScreen(!!document.fullscreenElement);
  // 	}
  //   };
  //   document.addEventListener("fullscreenchange", handleScreenChange);
  //   return () => {
  // 	document.removeEventListener("fullscreenchange", handleScreenChange);
  //   };
  // }, []);
  return (
    <div ref={ref} style={{ position: 'relative' }} {...rest}>
      <div style={{ position: 'absolute', right, top }}>
        <button
        // icon={fullScreen ? <MinIcon /> : <MaxIcon />}
        // onClick={toggleFullscreen}
        // bordered
        />
      </div>
      {children}
    </div>
  );
}

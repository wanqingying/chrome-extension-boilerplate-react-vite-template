import type { FC } from 'react';
import React from 'react';
import { useSessionStore } from '@/store/session';

interface IProps {
  className?: string;
}

export const InputText: FC<IProps> = function (_props) {
  return <div></div>;
  // <div
  //   className={styles["chat-input-panel"]}>
  //   <PromptHints prompts={promptHints} onPromptSelect={onPromptSelect} />
  //   <ChatActions
  //     uploadImage={uploadImage}
  //     setAttachImages={setAttachImages}
  //     setUploading={setUploading}
  //     showPromptModal={() => setShowPromptModal(true)}
  //     scrollToBottom={scrollToBottom}
  //     hitBottom={hitBottom}
  //     uploading={uploading}
  //     showPromptHints={() => {
  //       // Click again to close
  //       if (promptHints.length > 0) {
  //         setPromptHints([]);
  //         return;
  //       }
  //
  //       inputRef.current?.focus();
  //       setUserInput("/");
  //       onSearch("");
  //     }}
  //     setShowShortcutKeyModal={setShowShortcutKeyModal}
  //     setUserInput={setUserInput}
  //   />
  //   <label
  //     className={`${styles["chat-input-panel-inner"]} ${
  //       attachImages.length != 0
  //         ? styles["chat-input-panel-inner-attach"]
  //         : ""
  //     }`}
  //     htmlFor="chat-input"
  //   >
  //         <textarea
  //           id="chat-input"
  //           ref={inputRef}
  //           className={styles["chat-input"]}
  //           placeholder={Locale.Chat.Input(submitKey)}
  //           onInput={(e) => onInput(e.currentTarget.value)}
  //           value={userInput}
  //           onKeyDown={onInputKeyDown}
  //           onFocus={scrollToBottom}
  //           onClick={scrollToBottom}
  //           onPaste={handlePaste}
  //           rows={inputRows}
  //           autoFocus={autoFocus}
  //           style={{
  //             fontSize: config.fontSize,
  //             fontFamily: config.fontFamily,
  //           }}
  //         />
  //     {attachImages.length != 0 && (
  //       <div className={styles["attach-images"]}>
  //         {attachImages.map((image, index) => {
  //           return (
  //             <div
  //               key={index}
  //               className={styles["attach-image"]}
  //               style={{ backgroundImage: `url("${image}")` }}
  //             >
  //               <div className={styles["attach-image-mask"]}>
  //                 <DeleteImageButton
  //                   deleteImage={() => {
  //                     setAttachImages(
  //                       attachImages.filter((_, i) => i !== index),
  //                     );
  //                   }}
  //                 />
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     )}
  //     <IconButton
  //       icon={<SendWhiteIcon />}
  //       text={Locale.Chat.Send}
  //       className={styles["chat-input-send"]}
  //       type="primary"
  //       onClick={() => doSubmit(userInput)}
  //     />
  //   </label>
  // </div>
};

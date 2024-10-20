import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(e => {
  console.error(e);
});
chrome.action.onClicked.addListener(tab => {
  console.log('action clicked open side 2', tab);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchHtml') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      if (!tab || !tab.id || tab.url?.startsWith('chrome://')) {
        sendResponse({ html: '' });
        return;
      }
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => document.documentElement.outerHTML,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            sendResponse({ html: results[0].result });
          } else {
            sendResponse({ html: '' });
          }
        }
      );
    });
    return true; // 表示异步响应
  }
  return false;
});
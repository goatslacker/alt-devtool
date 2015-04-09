//window.addEventListener('beforeunload', onUnload);
window.addEventListener('message', onMessageFromPage);

const script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.extension.getURL('scripts/altInterface.js');
script.onload = function () {
  script.parentNode.removeChild(script);
};
document.documentElement.appendChild(script);

//function onUnload() {
//  chrome.runtime.sendMessage({
//    type: 'PAGE_UNLOADED'
//  });
//}

function onMessageFromPage(event) {
  if (event && event.source !== window) {
    return;
  }

  const message = event.data;

//  console.log('@@@@@@@@@@@@', event, message);

  if (typeof message !== 'object' || message === null || message.source !== 'alt-devtools') {
    return;
  }

//  console.log('Sending', message);

  chrome.runtime.sendMessage(message);
}

// Communicate with the alt interface
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//  console.log('WHAT THE RFUCK')
//  console.log(request)
  window.postMessage({
    payload: request,
    source: 'alt-hook'
  }, '*')
})

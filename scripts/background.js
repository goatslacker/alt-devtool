// background.js
var connections = {};

const cache = []

//console.log('OK I GUESS I LOADED');

chrome.runtime.onConnect.addListener(function (port) {

//  console.log('DID I FUCKING CONNECT????????????????????????');

  function extensionListener(message, sender, sendResponse) {

//    console.log('HOLY SHIT A NEW MESSAGE', message)

    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.name == "init") {
      connections[message.tabId] = port;

      if (cache.length) {
        // XXX I need to delay these until altInterface is ready
        cache.forEach(function (post) {
          post()
        })
        cache = []
      }

      return;
    }

    if (message.name === 'alt-interface') {
//      console.log('sending things!!!!!!');
      // XXX rather than send to every single fucking tab lets just send to the alt tab, can I do that?
      // what is a tab?! IM SO CONFUSED
      Object.keys(connections).forEach(function (id) {
        chrome.tabs.sendMessage(Number(id), message.payload);
      })
      return;
    }

    // other message handling
  }

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i=0, len=tabs.length; i < len; i++) {
      if (connections[tabs[i]] == port) {
        delete connections[tabs[i]]
        break;
      }
    }
  });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//  console.log('a stupid message', request);

  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.", tabId);
      cache.push(function () {
        connections[tabId].postMessage(request);
      })
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});

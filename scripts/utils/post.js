function post(type, payload) {
  window.postMessage({
    type: type,
    payload: payload,
    source: 'alt-devtools'
  }, '*')
}

export default post

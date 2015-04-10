import ALT from './altKey'
import registerAlt from './registerAlt'

const TIMEOUT = 1000

function poke(time) {
  if (time > TIMEOUT) {
    return
  }

  if (window[ALT]) {
    registerAlt()
  } else {
    setTimeout(function () {
      poke(time * 2)
    }, time)
  }
}

export default poke

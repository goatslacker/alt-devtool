import getAlt from './alt'
import registerAlt from './registerAlt'

const TIMEOUT = 30000

function poke(time) {
  if (time > TIMEOUT) {
    return
  }

  if (getAlt()) {
    registerAlt()
  } else {
    setTimeout(function () {
      poke(time * 2)
    }, time)
  }
}

export default poke

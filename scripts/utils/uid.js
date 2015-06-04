function uid() {
  return (Date.now() * Math.random()).toString(35).substr(0, 16)
}

export default uid

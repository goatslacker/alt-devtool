function uid() {
  return (Date.now() * Math.random()).toString(35).substr(0, 7)
}

export default uid

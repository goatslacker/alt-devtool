let idx = 0

const alts = {
  switch(i) {
    idx = i
  },

  all() {
    return window['goatslacker.github.io/alt/'] || window['alt.js.org']
  },

  map(f) {
    const all = alts.all()
    return (Array.isArray(all) ? all : [{ alt: all, name: 'Alt' }]).map(f)
  },

  get() {
    const all = alts.all()
    if (all) {
      return Array.isArray(all) ? all[idx].alt : all
    }

    return null
  }
}

export default alts

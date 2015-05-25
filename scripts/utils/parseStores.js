import alts from './alts'
import getStoreData from './getStoreData'

export default function parseStores() {
  return alts.all().map((obj, i) => {
    const alt = obj.alt
    const stores = Object.keys(alt.stores).map((storeName) => {
      const store = alt.stores[storeName]
      return getStoreData(store, store.getState())
    }, {})

    return { alt: i, stores }
  })
}

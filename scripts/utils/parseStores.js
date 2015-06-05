import alts from './alts'
import getStoreData from './getStoreData'

export default function parseStores() {
  return alts.map((obj, i) => {
    const alt = obj.alt
    const stores = Object.keys(alt.stores).map((storeName) => {
      const store = alt.stores[storeName]
      return getStoreData(store, alt.takeSnapshot(store))
    }, {})

    return { alt: i, stores }
  })
}

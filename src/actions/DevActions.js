import alt from '../flux/alt'

const DevActions = alt.generateActions(
  'addDispatch',
  'addStores',
  'clearAll',
  'clearDispatches',
  'replaceAlts',
  'revert',
  'search',
  'selectAlt',
  'selectRow',
  'selectStore',
  'toggleLogDispatch'
)

export default DevActions

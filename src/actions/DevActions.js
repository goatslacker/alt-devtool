import alt from '../flux/alt'

const DevActions = alt.generateActions(
  'addDispatch',
  'addStores',
  'clearDispatches',
  'revert',
  'search',
  'selectRow',
  'selectStore',
  'toggleLogDispatch'
)

export default DevActions

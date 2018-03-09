import app from './reducers/app.js'
import { combineReducers } from 'redux'
import datefinder from './reducers/datefinder.js'
import historyMealMap from './reducers/historyMealMap.js'
import meals from './reducers/meals.js'
import signups from './reducers/signups.js'
import user from './reducers/user.js'

const reducers = combineReducers({
  user,
  meals,
  signups,
  app,
  datefinder,
  historyMealMap,
})

export default reducers

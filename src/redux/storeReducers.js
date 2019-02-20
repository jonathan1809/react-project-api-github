import { combineReducers } from 'redux';
import listreducer from './listRepositories/reducer'
import searchReducer from './search/reducer';
const reducers = combineReducers({
    list: listreducer,
    search: searchReducer
})

export default reducers;
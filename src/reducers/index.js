import {combineReducers} from 'redux';
import fetchList from './fetch';
import  ListReducers from './listreducers';
import PersonData from './person-active';

const allReducers = combineReducers({
   forAllList: fetchList,
   forOnePerson: PersonData

  }
)

export default allReducers;

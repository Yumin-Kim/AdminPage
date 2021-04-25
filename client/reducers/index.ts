import { combineReducers } from 'redux';
import adminReducer from './admin.ts';
const RootReducer = combineReducers({
  admin: adminReducer,
});

export default RootReducer;

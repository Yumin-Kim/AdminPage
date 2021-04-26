import { combineReducers } from 'redux';
import adminReducer from './admin';
const RootReducer = combineReducers({
  admin: adminReducer,
});
export type ROOTSTATE = ReturnType<typeof RootReducer>;
export default RootReducer;

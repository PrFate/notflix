import {combineReducers} from 'redux';

import loginReducer from "./login";
import userReducer from './user';

const rootReducer = combineReducers({
    isLoggedIn: loginReducer,
    user: userReducer,
});
  
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
import {createStore, compose} from 'redux';
import {combineReducers} from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import {applyMiddleware} from 'redux';
import Middleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import modeReducer from './mode-reducer';


let reducers = combineReducers(
	{
		profile: profileReducer,
		dialogs: dialogsReducer,
		users: usersReducer,
		auth: authReducer,
		form: formReducer,
		app: appReducer,
		mode: modeReducer,
	}
);

type RootReducerType = typeof reducers;

export type GlobalStateType = ReturnType<RootReducerType>;

type ActionPropertiesType<T> = T extends {[key:string]: infer U}? U : never;
export type GetActionType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ActionPropertiesType<T>>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//@ts-ignore
const store = createStore(reducers, composeEnhancers(applyMiddleware(Middleware)));

export default store;
import {SetDataLoginThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {GetActionType, GlobalStateType} from "./redux-store";


type InitialStateType = {
	initializated: boolean,
};

let initialState: InitialStateType = {
	initializated: false,
};

const appReducer = (state = initialState,action: ActionsTypes): InitialStateType =>{
	switch(action.type){
		case 'INITIALIZATE_APP':
			return {
				...state,
				initializated: true,
			};
		default:
			return state;
	}
}

type ActionsTypes = GetActionType<typeof actions>;

export const actions = {
	InitializateAppAC: () =>({
		type:  'INITIALIZATE_APP',
	} as const),
};

type ThunkTypes = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>;

export const InitializateAppThunkCreator = (): ThunkTypes =>
	(dispatch) => {
	let promise = dispatch(SetDataLoginThunkCreator());
		debugger;
	Promise.all([promise])
		.then(()=>{
			debugger;
			dispatch(actions.InitializateAppAC());
	});
}

export default appReducer;
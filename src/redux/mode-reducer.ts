import {GetActionType, GlobalStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

let initialState = {
	stylesNav: new Map([
		[1, 'color1'],
		[2, 'color2'],
		[3, 'color3'],
		[4, 'color4'],
	]),
	stylesFullPartScreen: false,
	prevPage: null as number | null,
	currentPage: null as number | null,
};

type InitialStateType = typeof initialState;

const modeReducer = (state: InitialStateType = initialState,action: ActionsTypes) =>{
	switch(action.type){
		case 'SET_STYLE_NAV_MODE':
			const mapStyleMode = state.stylesNav;
			let difference = ((3 - action.key) < 0)?3: 3 - action.key;
			let map = new Map;
			Array.from(mapStyleMode.keys()).map((key)=>{
				let dif = key - difference;
				if ((key - difference)<=0){
					dif = 4 + key - difference;
				}
				map.set(key, mapStyleMode.get(dif));
			});
			return {
				...state,
				stylesNav: map,
			};
		case 'SET_STYLE_FULLPARTSCREEN':
			return {
				...state,
				stylesFullPartScreen: !state.stylesFullPartScreen,
			};
		default:
			return state;
	}
}

type ActionsTypes = GetActionType<typeof actions>;

const actions = {
	SetStylesNavModeAC: (value: number) => ({
		type: 'SET_STYLE_NAV_MODE',
		key: value,
	} as const),
	SetStylesFullPartScreenAC: () => ({
		type: 'SET_STYLE_FULLPARTSCREEN',
	} as const),

};

type ThunksTypes = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>

export const SetStyleNavModeThunkCreator = (key: number): ThunksTypes =>(dispatch)=>{
	dispatch(actions.SetStylesNavModeAC(key));
}

export const SetStylesFullPartScreenThunkCreator = (): ThunksTypes =>(dispatch)=>{
	dispatch(actions.SetStylesFullPartScreenAC());
}

export default modeReducer;
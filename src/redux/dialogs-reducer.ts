import {GetActionType} from "./redux-store";
import {DialogType, MessageType} from "../types/types";

let initialState = {
	dialogs:[
		{id:1, name: "Jhon"},
		{id:2, name: "Jhon2"},
		{id:3, name: "Jhon3"},
		{id:4, name: "Jhon4"},
		{id:5, name: "Jhon5"},
			] as Array<DialogType>,
		messages:[
		{id:1, message: "Jhon"},
		{id:2, message: "Jhon2"},
		{id:3, message: "Jhon3"},
		{id:4, message: "Jhon4"},
		{id:5, message: "Jhon5"},
			] as Array<MessageType>,
};

type InitialStateDialogsType = typeof initialState;

const dialogsReducer = (state = initialState,action: ActionsTypes): InitialStateDialogsType =>{
	switch(action.type){
		case 'ADD_MESSAGE':{
			let el = {
				id: state.messages.length + 1,
				message:action.newMessageText,
			}
			if(action.newMessageText!==''){
			return {
				...state,
				messages: [...state.messages, el],
			};
			}else{
				return state;
			}
		}
		default:
			return state;

	}
	
}

type ActionsTypes = GetActionType<typeof actions>;

export const actions = {
	AddMessageActionCreator: (value: string | null) => ({
		type: 'ADD_MESSAGE',
		newMessageText: value,
	} as const),
}



export default dialogsReducer;
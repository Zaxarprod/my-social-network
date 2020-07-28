import {authAPI, ResultCodeEnum, ResultCodeForCaptchaEnum, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {ThunkAction} from "redux-thunk";
import {GetActionType, GlobalStateType} from "./redux-store";

let initialState = {
	email: null as string | null,
	id: null as number | null,
	login: null as string | null,
	isAuth: false as boolean,
	captchaUrl: null  as string | null,
};

type InitialStateAuthType = typeof initialState;

const authReducer = (state = initialState,action: ActionsTypes):InitialStateAuthType =>{
	switch(action.type){
		case "SET_DATA_LOGIN":
			return {
				...state,
				...action.data,
			};
		case "CAPTCHA_SUCCESS":
			return {
				...state,
				captchaUrl: action.captchaUrl,
			};
		default:
			return state;
	}
}

type ActionsTypes = GetActionType<typeof actions>;

type DataLoginType = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
};

const actions = {
	SetDataLogin: (id: number | null, email: string | null ,login: string | null, isAuth: boolean) => ({
		type: 'SET_DATA_LOGIN',
		data: {id,email,login,isAuth},
	} as const),
	CaptchaUrlSuccess: (captchaUrl: string) => ({
		type: 'CAPTCHA_SUCCESS',
		captchaUrl: captchaUrl,
	} as const ),
};

type DataUserLoginType = {
	id: number
	email: string
	login: string
}

type DataLoginThunkCreatorType = {
	data: DataUserLoginType
	resultCode: number

}

type ThunksTypes = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>;

export const SetDataLoginThunkCreator = (): ThunksTypes =>{
	return (dispatch) => {
		return authAPI.setDataLogin()
		.then((data: DataLoginThunkCreatorType) =>{
			if (data.resultCode === 0){
				let {email,id,login} = data.data;
				dispatch(actions.SetDataLogin(id,email,login,true));
			}
			
		});
	}
}


export const Login = (email: string,password: string,rememberMe: boolean, captcha: string | null): ThunksTypes =>{
	return async (dispatch: any) =>{
		debugger;
		let data = await authAPI.login(email,password,rememberMe, captcha)
			if (data.resultCode === 0){
				dispatch(SetDataLoginThunkCreator());
			}
			else{
				if (data.resultCode === 10){
					debugger
					dispatch(GetCaptchaUrl());
				}
				dispatch(stopSubmit('login',{_error: (data.messages)?data.messages: "Some ERROR",}));
			}
	}
}
export const GetCaptchaUrl = (): ThunksTypes =>{
	return async (dispatch) =>{
		let data = await securityAPI.getCaptcha();
		dispatch(actions.CaptchaUrlSuccess(data.url));
	}
}

export const Logout = (): ThunksTypes =>{
	return async (dispatch)=>{
		let data = await authAPI.logout()
			if (data.resultCode === 0){
				dispatch(actions.SetDataLogin(null,null,null,false));
			}
	}
}

export default authReducer;
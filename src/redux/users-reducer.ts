import {ResultCodeEnum, usersAPI} from '../api/api';
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {GetActionType, GlobalStateType} from "./redux-store";

let initialState ={
	users: [
		
	] as Array<UserType>,
	currentPage: 1,
	totalCount: 50,
	pageCount: 3,
	isLoading: false as boolean,
	isClicked: [] as Array<number>,
	filter: {
		term: '' as string,
		friend: null as null | boolean,
	}
};

type InitialStateUsersType = typeof initialState;

export type FilterType = typeof initialState.filter;

const usersReducer = (state=initialState, action: ActionsTypes): InitialStateUsersType =>{
	switch(action.type){
		case 'FOLLOW':{
			return {
				...state,
				users: state.users.map((u)=>{
					if (u.id === action.userId){
						return {...u,followed: true};
					}
					else return u;
				}),
			};
		}
		case "UNFOLLOW":{
			return {
				...state,
				users: state.users.map((u)=>{
					if (u.id === action.userId){
						return {...u,followed: false};
					}
					else return u;
				}),
			};
		}
		case 'SET_USERS':
			return {
				...state, 
				users: action.users,
			}
		case 'SET_CURRENT_PAGE':
			return{
				...state,
				currentPage: action.page,
			}
		case 'SET_TOTAL_COUNT':
			return{
				...state,
				totalCount: action.count,
			}
		case 'SET_LOADING':
			return{
				...state,
				isLoading: action.isLoading,
			}
		case 'SET_CLICKED':
			return{
				...state,
				isClicked: action.isClicked?[...state.isClicked,action.id]:state.isClicked.filter(id=> id!=action.id),
			}
		case "FILTER_USERS":
			return{
				...state,
				filter: {
					term: action.term,
					friend: action.friend,
				}
			}
		default:
			return state;
	}
}

export let actions = {
	FollowActionCreator: (userId: number) => (
		{
			type: 'FOLLOW',
			userId: userId,
		} as const),
	UnFollowActionCreator: (userId: number) => (
		{
			type: 'UNFOLLOW',
			userId: userId,
		} as const),
	SetUsersActionCreator: (users: Array<UserType>) => (
		{
			type: 'SET_USERS',
			users: users,
		} as const),
	FilterUsersActionCreator: (filter: FilterType) => (
		{
			type: 'FILTER_USERS',
			term: filter.term,
			friend: filter.friend
		} as const),
	SetCurrentPageActionCreator: (page: number) => (
		{
			type: 'SET_CURRENT_PAGE',
			page: page,
		} as const),
	SetTotalCountActionCreator: (count: number) => (
		{
			type: 'SET_TOTAL_COUNT',
			count: count,
		} as const),
	SetLoadingActionCreator: (value: boolean) => (
		{
			type: 'SET_LOADING',
			isLoading: value,
		} as const),
	SetIsClicked: (id: number,isClicked: boolean) => (
		{
			type: 'SET_CLICKED',
			isClicked,
			id,
		} as const),
};

type ActionsTypes = GetActionType<typeof actions>;

type ThunkType = ThunkAction<void, GlobalStateType, unknown, ActionsTypes>;

export const getUsersThunkCreator = (currentPage: number, pageCount: number, filter: FilterType): ThunkType => {
	debugger;
	return (dispatch) =>{
		dispatch(actions.SetCurrentPageActionCreator(currentPage));
		dispatch(actions.FilterUsersActionCreator(filter));
		dispatch(actions.SetLoadingActionCreator(true));
		usersAPI.getUsers(currentPage,pageCount, filter)
		.then((data: any)=>{
			dispatch(actions.SetLoadingActionCreator(false));
			dispatch(actions.SetUsersActionCreator(data.items));
		});
	}
}

export const processFollowThunkCreator = (id: number): ThunkType => {
	return async (dispatch) =>{
		dispatch(actions.SetIsClicked(id,true));
		let data = await usersAPI.follow(id)
			if(data.resultCode === ResultCodeEnum.Success){
				dispatch(actions.FollowActionCreator(id));
			}
		dispatch(actions.SetIsClicked(id,false));
	}
}
export const processUnFollowThunkCreator = (id: number): ThunkType => {
	return async (dispatch) =>{
		dispatch(actions.SetIsClicked(id,true));
		let data = await usersAPI.unFollow(id)
		if(data.resultCode === ResultCodeEnum.Success){
			dispatch(actions.UnFollowActionCreator(id));
		}
		dispatch(actions.SetIsClicked(id,false));
	}
}

export default usersReducer;
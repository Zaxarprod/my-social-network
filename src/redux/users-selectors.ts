import {createSelector} from 'reselect';
import {GlobalStateType} from "./redux-store";

export const getArrayUsersSelector = (state: GlobalStateType) =>{
	return state.users.users;
}

export const getArrayUsers = createSelector(getArrayUsersSelector, (users)=>{
	return users;
});

export const getCurrentPage = (state: GlobalStateType) =>{
	return state.users.currentPage;
}

export const getTotalCount = (state: GlobalStateType) =>{
	return state.users.totalCount;
}

export const getPageCount = (state: GlobalStateType) =>{
	return state.users.pageCount;
}

export const getIsClicked = (state: GlobalStateType) =>{
	return state.users.isClicked;
}

export const getIsLoading = (state: GlobalStateType) =>{
	return state.users.isLoading;
}

export const getFilter = (state: GlobalStateType) =>{
	return state.users.filter;
}
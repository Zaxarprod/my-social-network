import {profileAPI, ResultCodeEnum} from '../api/api';
import {ThunkAction} from "redux-thunk";
import {GetActionType, GlobalStateType} from "./redux-store";
import {PostType, ProfileType} from "../types/types";


type PhotosType = {
	small: string
	large: string
};

let initialState = {
	posts: [
			{id:1, header: "Head1", description: "description1", likes: 1},
			{id:2, header: "Head2", description: "description2", likes: 2},
			{id:3, header: "Head3", description: "description3", likes: 3},
			{id:4, header: "Head4", description: "description4", likes: 4},
			{id:5, header: "Head5", description: "description5", likes: 5},
			] as Array<PostType>,
	profile: null as ProfileType | null,
	status: " ",
};

type InitialStateProfileType = typeof initialState;

const profileReducer = (state = initialState,action: ActionsTypes): InitialStateProfileType =>{
	switch(action.type){
		case 'ADD_POST':{
			let el = {
				id: state.posts.length + 1,
				header: "Header" + (state.posts.length + 1),
				description: action.newText,
				likes: 0,
			}
			return {
				...state,
				posts: [...state.posts, el],
			};
		}
		case 'SET_PROFILE':
			return {
				...state,
				profile: action.profile,
			};
		case 'SET_STATUS':
			return {
				...state,
				status: action.status,
			};
		case "SET_PHOTOS":
			return {
				...state,
				profile: {
					...state.profile,
					photos: action.photos,
				} as  ProfileType
			};
		case "UPDATE_PROFILE_INFO":
			return {
				...state,
				profile: {
					...state.profile,
					...action.profile,
					contacts: {
						...action.profile.contacts
					},
				},
			};
		default:
			return state;

	}
	
}

type ActionsTypes = GetActionType<typeof actions>;

export const actions = {
	AddPostActionCreator: (value: string) => ({
		type: 'ADD_POST',
		newText: value,
	} as const),
	SetProfile: (profile: ProfileType) => ({
		type: 'SET_PROFILE',
		profile,
	} as const),
	SetStatus: (status: string) => ({
		type: 'SET_STATUS',
		status,
	} as const),
	SetPhotosSuccess: (photos: PhotosType) => ({
		type: 'SET_PHOTOS',
		photos
	} as const),
	UpdateProfileInfo: (profile: ProfileType) => ({
		type: 'UPDATE_PROFILE_INFO',
		profile
	} as const),

};


type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown, ActionsTypes>;

export const SetProfileThunkCreator = (userId: number): ThunkType =>{
	return async (dispatch) => {
		let data =  await profileAPI.setProfile(userId)
			dispatch(actions.SetProfile(data));
	}
}

export const SetProfileStatusThunkCreator = (userId: number): ThunkType =>{
	return async (dispatch) => {
		let data = await profileAPI.getStatus(userId)
			dispatch(actions.SetStatus(data));
	}
}

export const UpdateProfileStatusThunkCreator = (status: string): ThunkType =>{
	return async (dispatch) => {
		let data = await profileAPI.updateStatus(status)
			if(data.resultCode === ResultCodeEnum.Success){
				dispatch(actions.SetStatus(status));
			}
	}
}

export const SetPhotoThunkCreator = (file: File): ThunkType =>{
	return async (dispatch) => {
		let data = await profileAPI.savePhotos(file);
		if(data.resultCode === ResultCodeEnum.Success){
			dispatch(actions.SetPhotosSuccess(data.data.photos));
		}
	}
}

export const UpdateProfileInfoThunkCreator = (profile: ProfileType): ThunkType =>{
	debugger;
	return async (dispatch) => {
		let data = await profileAPI.updateProfileInfo(profile);
		if(data.resultCode === ResultCodeEnum.Success){
			dispatch(actions.UpdateProfileInfo(profile));
			dispatch(SetProfileThunkCreator(profile.userId));
		}
	}
}

export default profileReducer;
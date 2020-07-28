import axios from 'axios';
import {ProfileType, UserType} from "../types/types";
import {FilterType} from "../redux/users-reducer";

let instance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	withCredentials: true,
	headers: {
		'API-KEY': 'f1796475-7860-4d90-b77a-0909d16a13cf'
	},
});

export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
};

export enum ResultCodeForCaptchaEnum {
	Captcha = 10,
}

type UsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string
};

type FollowResponse = {
	resultCode: ResultCodeEnum
	messages: string[]
}

export let usersAPI = {
	getUsers(currentPage: number,pageCount: number, filter: FilterType){
		return instance.get<UsersResponseType>
		(`users?page=${currentPage}&count=${pageCount}&term=${filter.term}&friend=${filter.friend}`).then(
				response => {
					return response.data;
				}
			)
	},
	follow(id: number){
		return instance.post<FollowResponse>(`follow/${id}`).then(
				response => {
					return response.data;
				}
			)
	},
	unFollow(id: number){
		return instance.delete<FollowResponse>(`follow/${id}`).then(
				response => {
					return response.data;
				}
			)
	},
};

type UpdateStatusResponse = {
	resultCode: ResultCodeEnum
	messages: string[]
}

type UpdateProfileResponse = {
	resultCode: ResultCodeEnum
	messages: string[]
}

export let profileAPI = {
	setProfile(id: number){
		return instance.get<ProfileType>('profile/' + id).then(
				response => {
					return response.data;
				}
			)
	},
	getStatus(id: number){
		return instance.get<string>('profile/status/' + id).then(
				response => {
					return response.data;
				}
		);
	},

	updateStatus(status: string){
		return instance.put<UpdateStatusResponse>('profile/status',{status:status}).then(
				response => {
					return response.data;
				}
		);
	},

	savePhotos(file: File){
		let fd= new FormData();
		fd.append('image', file);
		return instance.put('profile/photo', fd, {
			headers: { 'content-type': 'multipart/form-data' }
		}).then(
			response => {
				return response.data;
			}
		);
	},
	updateProfileInfo(profile: ProfileType){
		return instance.put('profile', profile).then(
			response => {
				return response.data;
			}
		)
	}
};

type MeResponseType = {
	data: {
		id: number
		login: string
		email: string
	}
	resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
	messages: string[]
};

type LoginResponseType = {
	resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
	messages: string[]
};

export let authAPI = {
	setDataLogin(){
		return instance.get<MeResponseType>('auth/me').then(
				response => {
					return response.data;
				}
			);
	},
	login(email: string,password: string,rememberMe = false, captcha: string | null = null){
		debugger;
		return instance.post<LoginResponseType>('/auth/login',{email,password,rememberMe, captcha}).then(
			response => {
					return response.data;
				}
		);
	},
	logout(){
		return instance.delete<LoginResponseType>('/auth/login').then(
			response => {
					return response.data;
				}
		);
	}
};

type SecurityResponseType = {
	url: string,
};

export let securityAPI = {
	getCaptcha(){
		return instance.get<SecurityResponseType>('security/get-captcha-url').then(
			response => {
				return response.data;
			}
		);
	},
};
import React, {Component} from 'react';
import Profile from './Profile';
import {
	SetProfileThunkCreator, SetProfileStatusThunkCreator,
	UpdateProfileStatusThunkCreator, SetPhotoThunkCreator, UpdateProfileInfoThunkCreator
} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {SetDataLoginThunkCreator} from '../../redux/auth-reducer';
import {GlobalStateType} from "../../redux/redux-store";
import {DispatchType, ProfileType} from "../../types/types";

type mapStateToPropsType = {
	profile: ProfileType | null
	id: number | null
	status: string
	isAuth: boolean
};

type mapDispatchToProps = {
	SetProfileThunkCreator: DispatchType<number | null>
	SetProfileStatusThunkCreator: DispatchType<number | null>
	UpdateProfileStatusThunkCreator: DispatchType<string>
	SetDataLoginThunkCreator: DispatchType<{}>
	SetPhotoThunkCreator: DispatchType<File>
	UpdateProfileInfoThunkCreator: DispatchType<ProfileType>
};


type SummaryPropsType = mapStateToPropsType & mapDispatchToProps;

class ProfileContainer extends Component<SummaryPropsType>{

	componentDidMount(){
		//@ts-ignore
		let userId = this.props.match.params.userId;
		if(!userId){
			userId = this.props.id;
			//if(!this.props.id) userId = 2;
		}
		this.props.SetProfileThunkCreator(userId);
		this.props.SetProfileStatusThunkCreator(userId);
	}
	//@ts-ignore
	componentDidUpdate(prevProps,prevState){
		{/*@ts-ignore*/}
		if(prevProps.match.params.userId !== this.props.match.params.userId){
			this.props.SetProfileThunkCreator(this.props.id);
			this.props.SetProfileStatusThunkCreator(this.props.id);
		}
	}

	render(){
		if(!this.props.isAuth){
			return <Redirect to={'/login'} />
		}
		return(
			<Profile profile={this.props.profile}
					 status = {this.props.status}
					 updateStatus = {this.props.UpdateProfileStatusThunkCreator}
					 savePhoto={this.props.SetPhotoThunkCreator}
					 id = {this.props.id}
					 /*@ts-ignore*/
					 isOwner = {!this.props.match.params.userId || (this.props.match.params.userId == this.props.id)}
					 updateProfileInfo = {this.props.UpdateProfileInfoThunkCreator}
					/>
			);
	}
}

let mapStateToProps = (state: GlobalStateType): mapStateToPropsType => {
	return {
		profile: state.profile.profile,
		id: state.auth.id,
		status: state.profile.status,
		isAuth: state.auth.isAuth,
	};
}

export default compose<React.ComponentType>(
		connect(mapStateToProps,{SetProfileThunkCreator,SetProfileStatusThunkCreator,
		UpdateProfileStatusThunkCreator,SetDataLoginThunkCreator,
			SetPhotoThunkCreator, UpdateProfileInfoThunkCreator}),
		withRouter,
	)
(ProfileContainer);
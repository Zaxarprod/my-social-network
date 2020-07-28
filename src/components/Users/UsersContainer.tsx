import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
	getUsersThunkCreator, processUnFollowThunkCreator,
	processFollowThunkCreator, FilterType
} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader';
import {Component} from 'react';
import {
	getCurrentPage, getArrayUsers, getTotalCount,
	getPageCount, getIsClicked, getIsLoading, getFilter
} from '../../redux/users-selectors';
import {GlobalStateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";


type StateToPropsType = {
	users: Array<UserType>
	currentPage: number
	totalCount: number
	pageCount: number
	isClicked: Array<number>
	isLoading: boolean
	filter: FilterType
};

type DispatchToPropsType = {
	processFollow: (id: number) => void
	processUnFollow: (id: number) => void
	getUsers: (currentPage: number, pageCount: number, filter: FilterType) => void

};

type OwnPropsType = {

};

type PropsType = StateToPropsType & DispatchToPropsType & OwnPropsType;

class UsersApiComponent extends Component<PropsType>{

	componentDidMount(){
		this.props.getUsers(this.props.currentPage,this.props.pageCount, this.props.filter);
	}

	SetCur = (el: number) => {
		this.props.getUsers(el,this.props.pageCount, this.props.filter);
	}
	onFilterChanged = (filter: FilterType) => {
		this.props.getUsers(1,this.props.pageCount, filter);
	}

	render() {
		return (
			<>
				{this.props.isLoading ? <Preloader/> :
				<Users users={this.props.users}
					   currentPage = {this.props.currentPage}
					   totalCount = {this.props.totalCount}
					   pageCount = {this.props.pageCount}
					   isClicked = {this.props.isClicked}
					   isLoading = {this.props.isLoading}
					   processFollow={this.props.processFollow}
					   processUnFollow={this.props.processUnFollow}
					   SetCur={this.SetCur}
					   onFilterChanged = {this.onFilterChanged}
					   filter={this.props.filter}
					 />}
			</>
		);
	}
}


let mapStateToProps = (state: GlobalStateType): StateToPropsType =>{
	return {
		users: getArrayUsers(state),
		currentPage: getCurrentPage(state),
		totalCount: getTotalCount(state),
		pageCount: getPageCount(state),
		isClicked: getIsClicked(state),
		isLoading: getIsLoading(state),
		filter: getFilter(state),

	};
}


export default connect<StateToPropsType, DispatchToPropsType, OwnPropsType, GlobalStateType>( mapStateToProps,{
		getUsers:getUsersThunkCreator,
		processFollow: processFollowThunkCreator,
		processUnFollow: processUnFollowThunkCreator,
})(UsersApiComponent);
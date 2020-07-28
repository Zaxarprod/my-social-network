import React, {Component} from 'react';
import Dialogs from './Dialogs';
import {actions} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {GlobalStateType} from "../../redux/redux-store";
import {DialogType, MessageType} from "../../types/types";


export type mapStateToPropsType = {
	dialogs: {
		dialogs: Array<DialogType>
		messages: Array<MessageType>
	}
	isAuth: boolean
}

export type mapDispatchToPropsType = {
	addMessage: (value: string) => void
}

let mapStateToProps = (state: GlobalStateType): mapStateToPropsType =>{
	return {
		dialogs: state.dialogs,
		isAuth: state.auth.isAuth,
	};
}

export default compose<React.ComponentType>(
		connect(mapStateToProps, {addMessage: actions.AddMessageActionCreator}),
		withAuthRedirect
	)
(Dialogs); 
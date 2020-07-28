import React, {Component} from 'react';
import Message from './Message/Message';
import DialogsItem from './DialogsItem/DialogsItem';
import {Redirect} from 'react-router-dom';
import {Field, FormSubmitHandler, InjectedFormProps, reduxForm, SubmitHandler} from 'redux-form';
import {TextArea} from '../common/ControlsForm/ControlForms';
import Preloader from '../common/Preloader/Preloader';
import {required, maxLength} from '../../util/validators/validators';
import {mapStateToPropsType, mapDispatchToPropsType} from "./DialogsContainer";
import d from './Dialogs.module.css';

let requiredMaxLength = maxLength(100);

type LoginFormDataType = {
	newMessageText: string,
}

const AddMessageForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name={"newMessageText"} placeholder={"Enter Text"} component ={TextArea}
				validate = {[required,requiredMaxLength]}/>
			</div>
			<div>
				<button>SEND</button>
			</div>
		</form>
	);
}

let AddMessageFormRedux = reduxForm<LoginFormDataType>({form: "AddMessageForm"})(AddMessageForm);
type SubmitType = SubmitHandler<LoginFormDataType> | FormSubmitHandler<LoginFormDataType> | undefined

const Dialogs: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props)=>{
	let DialogsElements = props.dialogs.dialogs.map(el => <DialogsItem id = {el.id} name = {el.name} />);
	let MessagesElements = props.dialogs.messages.map (el => <Message message={el.message} /> );

	let addMessage = (value: LoginFormDataType) => {
		props.addMessage(value.newMessageText);
	}

	return(
		<>
			<div className={d.dialogs}>
				<div className = {d.dialogsItems}>
					{DialogsElements}
				</div>
				<div className={d.messages}>
					{MessagesElements}
				</div>
			</div>
			<AddMessageFormRedux onSubmit={addMessage} />
		</>
	);
	
}

export default Dialogs;
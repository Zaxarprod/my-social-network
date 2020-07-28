import React, {Component} from 'react';
import d from '../Dialogs.module.css';
import {MessageType} from "../../../types/types";

type PropsType ={
	message: string | null | undefined
};

class Message extends Component<PropsType>{

	render(){

		return (
			<div className={d.message}>{this.props.message}</div>
		);
	}
}
export default Message;
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import d from '../Dialogs.module.css';

type PropsType = {
	name:  string | null | undefined,
	id: number
};

class DialogsItem extends Component<PropsType>{
	render(){
		let path = "/dialogs/" + this.props.id;
		return(
			<div className={d.dialog}><NavLink to={path}>{this.props.name}</NavLink></div>
		);
	}
}

export default DialogsItem;
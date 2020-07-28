import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/ControlsForm/ControlForms';
import {required, maxLength} from '../../util/validators/validators';
import {Login} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import style from './../common/ControlsForm/ControlForms.module.css';
import {GlobalStateType} from "../../redux/redux-store";
import {mapStateToPropsType} from "../Dialogs/DialogsContainer";

type MapStateToPropsType = {
	isAuth: boolean
	id: number | null
	captchaUrl: string | null
};

type MapDispatchToProps = {
	Login: (login: string,password: string,rememberMe: boolean, captcha: string | null) => Promise<void>
};

type OwnPropsType = {
	captchaUrl: string | null
};

type LoginFormDataType = {
	login: string
	password: string
	rememberMe: boolean
	captchaUrl: string | null
};

type FieldNameType = Extract<keyof LoginFormDataType, string>;

let requiredMaxLength = maxLength(30);
let LoginForm: React.FC<InjectedFormProps<LoginFormDataType, OwnPropsType> & OwnPropsType> = (props) =>{
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field validate = {[required,requiredMaxLength]} 
				placeholder={"Login"} name = {"login"} component={Input} />
			</div>
			<div>
				<Field placeholder={"Password"} type={"password"} validate = {[required,requiredMaxLength]}
				 name={"password"} component={Input} />
			</div>
			<div>
				<Field type={"checkbox"} name={"rememberMe"} component={"input"} /> RememberMe
			</div>
			{props.error &&
			(<div className={style.commonError}>
				{props.error}
			</div>)}
			{props.captchaUrl && <img src={props.captchaUrl} />}
			{props.captchaUrl && <Field type={"text"} validate = {[required]} name={"captchaUrl"} component={Input}/>}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
}

let ReduxFormLogin = reduxForm<LoginFormDataType, OwnPropsType>({form: 'login'})(LoginForm);

let WrapperLoginForm: React.FC<MapStateToPropsType & MapDispatchToProps> = (props) =>{
	if(props.isAuth) {
		return (<Redirect to={'/profile/' + props.id} />);
	}
	return (
		<div>
			<h2>Login</h2>
			<ReduxFormLogin  captchaUrl = {props.captchaUrl}
				onSubmit={(formData: LoginFormDataType)=>{
					debugger;
				props.Login(formData.login,formData.password,formData.rememberMe, formData.captchaUrl);
			}} />
		</div>
	);

}

let mapStateToProps = (state: GlobalStateType): MapStateToPropsType =>({
	isAuth: state.auth.isAuth,
	id: state.auth.id,
	captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps,{Login})(WrapperLoginForm);
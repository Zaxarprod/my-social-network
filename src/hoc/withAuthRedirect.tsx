import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {GlobalStateType} from "../redux/redux-store";

let mapStateToProps = (state: GlobalStateType) => {
	return {
		isAuth: state.auth.isAuth,
	};
}

type mapStateToPropsType = {
	isAuth: boolean
};

type mapDispatchToProps = {

};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){
	const RedirectComponent: React.FC<mapStateToPropsType & mapDispatchToProps> = (props) => {
			let {isAuth, ...restProps} = props;
			if(isAuth === false){
				return <Redirect to = "/login" />
			}
			return <WrappedComponent {...restProps as WCP} />
	}

	let ConnectedRedirectComponent = connect<mapStateToPropsType, mapDispatchToProps , WCP, GlobalStateType>
	(mapStateToProps, {})
	(RedirectComponent);

	return ConnectedRedirectComponent;
}
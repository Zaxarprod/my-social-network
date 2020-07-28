import React,{Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Logout} from '../../redux/auth-reducer';
import {GlobalStateType} from "../../redux/redux-store";

type mapStateToPropsType = {
	auth: {
		email: string | null,
		id: number | null,
		login: string | null,
		isAuth: boolean,
	},
};

type mapDispatchToProps = {
	Logout: () => Promise<void>,
};

class HeaderContainer extends Component<mapStateToPropsType & mapDispatchToProps>{
	render(){
		return (<Header  {...this.props} />);
	}
}

let mapStateToProps = (state: GlobalStateType): mapStateToPropsType =>{
	return{
		auth: state.auth,
	};
}


export default connect(mapStateToProps,{Logout})(HeaderContainer);
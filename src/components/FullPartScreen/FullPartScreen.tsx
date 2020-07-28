import React from 'react';
import {connect} from 'react-redux';
import {SetStylesFullPartScreenThunkCreator} from '../../redux/mode-reducer';
import style from './FullPartScreen.module.css';
import {GlobalStateType} from "../../redux/redux-store";

type mapStateToPropsType = {
	flag_styles: boolean,
};

type mapDispatchToProps = {
	SetStylesFullPartScreenThunkCreator: ()=> void,
};

const FullPartScreen: React.FC<mapStateToPropsType & mapDispatchToProps> = (props) =>{

	return (
		<div className={(props.flag_styles?style.butt_full:style.butt_part) + ' ' + style.butt} 
		onClick = {()=>{ props.SetStylesFullPartScreenThunkCreator()}}>

		</div>
	);
}

let mapStateToProps = (state: GlobalStateType): mapStateToPropsType => ({
	flag_styles: state.mode.stylesFullPartScreen,
});

export default connect(mapStateToProps, {SetStylesFullPartScreenThunkCreator})(FullPartScreen);
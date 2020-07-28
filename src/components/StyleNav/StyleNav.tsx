import React from 'react';
import style from './StyleNav.module.css';
import {connect} from 'react-redux';
import {SetStyleNavModeThunkCreator} from '../../redux/mode-reducer';
import {GlobalStateType} from "../../redux/redux-store";

type mapStateToPropsType = {
	styles: Map<number,string>
};

type mapDispatchToPropsType = {
	SetStyleNavModeThunkCreator: (key: number) => void
};

const StyleNav: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) =>{
	const styles = ['one','two','main','four',];
	const mapStyles: Map<number,string> = props.styles;
	return (
		<div className={style.styleNav}>
			{Array.from(mapStyles.keys()).map((key)=>{
					return  (
						//@ts-ignore
						<div className={style[styles[key-1]] + ' ' + style[mapStyles.get(key)]}
						onClick={()=>{
							props.SetStyleNavModeThunkCreator(key);
						}}>
						</div>
					);
			})}
		</div>
	);
}

let mapStateToProps = (state: GlobalStateType): mapStateToPropsType =>({
	styles: state.mode.stylesNav,
});

export default connect(mapStateToProps, {SetStyleNavModeThunkCreator,})(StyleNav);
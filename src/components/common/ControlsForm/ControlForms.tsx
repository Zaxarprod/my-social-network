import React from 'react';
import style from './ControlForms.module.css';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";

export const TextArea: React.FC<FormsControlType> = ({input,meta,...props}) =>{
	let hasError = meta.touched && meta.error;
	return (
		<>
			<div>
				<textarea {...input} {...props} className={hasError && style.TextForm}/>
				{hasError?<div className={style.errorFieldNull}>
					{meta.error}
				</div>:null}
			</div>
		</>
	);
}

type FormsControlType = {
	meta: WrappedFieldMetaProps
	input: WrappedFieldInputProps
}

export const Input: React.FC<FormsControlType> = ({input,meta,...props}) =>{
	let hasError = meta.touched && meta.error;
	return (
		<>
			<div>
				<input {...input} {...props} className={hasError && style.TextForm}/>
				{hasError?<div className={style.errorFieldNull}>
					{meta.error}
				</div>:null}
			</div>
		</>
	);
}
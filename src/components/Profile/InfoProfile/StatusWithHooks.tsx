import React,{useState, useEffect} from 'react';
import {DispatchType} from "../../../types/types";

type PropsType = {
	updateStatus: DispatchType<string>
	status: string
};

const StatusWithHooks: React.FC<PropsType> = (props) =>{

	useEffect(()=>{
		setStatus(props.status);
	}, [props.status]);

	let [editMode,setEditMode] = useState(false);
	let [status,setStatus] = useState(props.status);

	let activateEditMode = () =>{
		setEditMode(true);
	}

	let deactivateEditMode = () =>{
		setEditMode(false);
		props.updateStatus(status);
	}
	let onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) =>{
		setStatus(e.currentTarget.value);
	}

	return (
			<div style={{marginBottom:'1vw'}}>
				{!editMode && 
				<div>
					<span><b>Status: </b></span>
					<span onClick={activateEditMode}>{status?status:'Введите статус'}</span>
				</div>
				}
				{editMode &&
				<div>
					<span><b>Status: </b></span>
					<input autoFocus={true} onChange={onChangeStatus} 
					onBlur={deactivateEditMode} value={status}/>
				</div>
				}
			</div>
	);
}

export default StatusWithHooks;
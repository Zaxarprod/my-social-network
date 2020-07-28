import React from 'react';
import p from './Profile.module.css';
import ContainerMyPosts from './MyPosts/ContainerMyPosts';
import InfoProfile from './InfoProfile/InfoProfile';
import {DispatchType, ProfileType} from "../../types/types";

type PropsType = {
	profile: ProfileType | null
	updateStatus: DispatchType<string>
	status: string
	id: number | null
	isOwner: boolean
	savePhoto: (file: File) => void
	updateProfileInfo: (profile: ProfileType) => void
};

let Profile: React.FC<PropsType> = (props) => {
	return(
			<div className={p.content}>
				<div style = {{width:'100%'}}>
					<InfoProfile profile={props.profile}
								 status={props.status}
								 updateStatus={props.updateStatus}
								 isOwner = {props.isOwner}
								 savePhoto={props.savePhoto}
								 updateProfileInfo = {props.updateProfileInfo}
					/>
				</div>
				<div style = {{width:'100%'}}>
					<ContainerMyPosts />
				</div>
			</div>
	);
}

export default Profile;
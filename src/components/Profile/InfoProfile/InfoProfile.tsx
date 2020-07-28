import React, {ChangeEvent, useEffect, useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import Status from './StatusWithHooks';
import {DispatchType, ProfileType} from "../../../types/types";
import s from './InfoProfile.module.css';
import {FilterType} from "../../../redux/users-reducer";
import {Field, Form, Formik} from "formik";

type PropsType = {
	profile: ProfileType | null
	updateStatus: DispatchType<string>
	status: string
	isOwner: boolean
	savePhoto: (file: File) => void
	updateProfileInfo: (profile: ProfileType) => void
};

let InfoProfile: React.FC<PropsType> = (props) =>{

	/*useEffect(()=>{
		setProfile(props.profile);
	}, [props.profile]);*/

	let [editMode,setEditMode] = useState(false);
	let [profile,setProfile] = useState(props.status);

	let onSaveUpdatedProfile = (values: ProfileType) => {
		debugger;
		props.updateProfileInfo(values);
		setEditMode(false);
	}

	if(!props.profile){
		return <Preloader/>
	}
	let onMainPhotoSelected = (e: any) => {
		if(e.target.files.length){
			props.savePhoto(e.target.files[0]);
		}
	}
	return(
		<div>
			<img src={props.profile.photos.large ||
			"https://yt3.ggpht.com/a/AATXAJxE--dbMxyoE_GOtXGMo4QzMurHFL0PFPWJhQ=s900-c-k-c0xffffffff-no-rj-mo"} style={{width:'20%',marginBottom:'1vw',marginTop:'1vw'}} />
			<div>{props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}</div>
			{!editMode && props.isOwner &&
				<ProfileData profile = {props.profile} onEditMode = {() => {setEditMode(true)}} />
			}
			{editMode && props.isOwner &&
				<ProfileDataForm onSaveUpdatedProfile = {onSaveUpdatedProfile} profile = {props.profile} />
			}
			<Status status={props.status} updateStatus={props.updateStatus} />
		</div>
	);
}

type PropsForProfileDataType = {
	profile: ProfileType,
	onEditMode: () => void,
};

const ProfileData: React.FC<PropsForProfileDataType> = ({profile, onEditMode}) => {
	return (
		<div className={s.profileData}>
			<button onClick={onEditMode}>
				Edit
			</button>
			<div>
				<b>Name: </b>{profile.fullName}
			</div>
			<div>
				<b>About me: </b>{profile.aboutMe}
			</div>
			<div>
				<b>lookingForAJob: </b>{(profile.lookingForAJob)?'Yes':'No'}
			</div>
			{profile.lookingForAJob &&
			<div>
				<b>lookingForAJobDescription: </b>{profile.lookingForAJobDescription}
			</div>
			}
			<div className={s.contacts}>
				<b>Contacts: </b>{Object.keys(profile.contacts).map((key) => {
					return (
						<div>
							<b>{key}: </b>
							{
								//@ts-ignore
								profile.contacts[key]
							}
						</div>
					);
			})}
			</div>

		</div>
	);
}

type PropsForProfileDataForm = {
	onSaveUpdatedProfile: (values: ProfileType) => void,
	profile: ProfileType,
};

const ProfileDataForm: React.FC<PropsForProfileDataForm> = ({profile, onSaveUpdatedProfile}) => {
	return (
		<div className={s.profileData}>
			<Formik
				initialValues={
					{
						fullName: profile.fullName,
						aboutMe: profile.aboutMe,
						lookingForAJob: profile.lookingForAJob,
						lookingForAJobDescription: profile.lookingForAJobDescription,
						contacts: {
							facebook: profile.contacts.facebook,
							website: profile.contacts.website,
							vk: profile.contacts.vk,
							twitter: profile.contacts.twitter,
							instagram: profile.contacts.instagram,
							youtube: profile.contacts.youtube,
							github: profile.contacts.github,
							mainLink: profile.contacts.mainLink,
						},
					}
				}
				validate={values => {}}
				onSubmit={(values: any, { setSubmitting }) => {
					onSaveUpdatedProfile(values);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<button type="submit" disabled={isSubmitting}>
							Save
						</button>
						<div>
							<b>Name: </b><Field type="text" name="fullName"/>
						</div>
						<div>
							<b>About me: </b><Field type="text" name="aboutMe"/>
						</div>
						<div>
							<b>lookingForAJob: </b>
							<Field as="select" name="lookingForAJob">
								<option value="false">No</option>
								<option value="true">Yes</option>
							</Field>
						</div>
						<div>
							<b>lookingForAJobDescription: </b>
							<Field type="text" name="lookingForAJobDescription"/>
						</div>
						<div className={s.contacts}>
							<b>Contacts: </b>{Object.keys(profile.contacts).map((key) => {
							return (
								<div>
									<b>{key}: </b>
									<Field type="text" name={'contacts.' + key} />
								</div>
							);
						})}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default InfoProfile;
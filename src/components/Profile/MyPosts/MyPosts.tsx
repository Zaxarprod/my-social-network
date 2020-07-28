import React from 'react';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {required, maxLength} from '../../../util/validators/validators';
import {TextArea} from '../../common/ControlsForm/ControlForms';
import m from './MyPosts.module.css';
import {PostType, ProfileType} from "../../../types/types";

let requiredMaxLength = maxLength(10);

type PropsType = {
	profile: {
		profile: ProfileType | null
		status: string
		posts: PostType[]
	}
	addPost: (text: string) => void
}

type LoginFormDataType = {
	newPostText: string,
};

const AddPostForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) =>{
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name="newPostText"
				validate = {[required,requiredMaxLength]} component={TextArea} placeholder={'Input text'} />
			</div>
			<div>
				<button>Add Post</button>
			</div>
		</form>
	);
}

let AddPostFormRedux = reduxForm<LoginFormDataType>({form: "AddPostForm"})(AddPostForm);

const MyPosts: React.FC<PropsType> = React.memo(props =>{

	console.log('Render');

	let PostsElements = props.profile.posts.map(el=> <Post header={el.header} description={el.description}
		likes={el.likes}/>);
	let addPost = (value: LoginFormDataType) =>{
		props.addPost(value.newPostText);
	}
	return(
			<div>
				<AddPostFormRedux onSubmit={addPost} />
				{PostsElements}
			</div>
	);
});

export default MyPosts;
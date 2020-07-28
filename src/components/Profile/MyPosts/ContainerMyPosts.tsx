import MyPosts from "./MyPosts"
import {actions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {PostType, ProfileType} from "../../../types/types";
import {GlobalStateType} from "../../../redux/redux-store";

type mapStateToPropsType = {
	profile: {
		profile: ProfileType | null
		status: string
		posts: PostType[]
	}
};
let mapStateToProps = (state: GlobalStateType): mapStateToPropsType =>{
	return {
		profile: state.profile,
	};
}

const ContainerMyPosts = connect(mapStateToProps,{addPost: actions.AddPostActionCreator})(MyPosts);

export default ContainerMyPosts;
import React from 'react';
import p from './Post.module.css';
import {PostType} from "../../../../types/types";

type PropsType = {
	header: string,
	description: string
	likes: number
};

const Post: React.FC<PropsType> = (props) => {
		return(
			<div className={p.post}>
				<div>
					<img src="" className ={p.ava} />
					<h2>{props.header}</h2>
				</div>
				<div>
					<p>{props.description}</p>
				</div>
				<div>
					<span>Like {props.likes}</span>
				</div>
			</div>
		);
}

export default Post;
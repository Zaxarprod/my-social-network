import React,{FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import u from './Users.module.css';
import {NavLink} from 'react-router-dom';
import {UserType} from "../../types/types";
import SearchUsersForm from './SearchUsersForm/SearchUsersForm';
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
	totalCount: number
	pageCount: number
	processUnFollow: (id: number)=> void
	isClicked: Array<number>
	processFollow: (id: number)=> void
	SetCur: (numb: number) => void
	currentPage: number
	users: Array<UserType>
	isLoading: boolean
	filter: FilterType
	onFilterChanged: (filter: FilterType) => void
};

let Users: FC<PropsType> = ({totalCount, pageCount, processUnFollow, isClicked,
								processFollow, SetCur, currentPage,users,
								onFilterChanged})=>{
		return(
					<div className={u.content}>
						<div>
							<SearchUsersForm onFilterChanged = {onFilterChanged}/>
						</div>
						<Paginator totalCount={totalCount} pageCount={pageCount}
									currentPage={currentPage} SetCur={SetCur} />
						{users.map((el)=>{
							return (<div className={u.main_block}>
								<NavLink to={'/profile/'+ el.id}><img src={el.photos.small!=null?
									el.photos.small:"https://yt3.ggpht.com/a/AATXAJxE--dbMxyoE_GOtXGMo4QzMurHFL0PFPWJhQ=s900-c-k-c0xffffffff-no-rj-mo"} 
									className={u.profile_photo}/></NavLink>
								<h2>{el.name}</h2>
								<p className={u.status}>{el.status}</p>
								<p className={u.city}>{el.city}</p>
								{el.followed?
								<button disabled={isClicked.some( id => id === el.id )} onClick={()=> {
									processUnFollow(el.id);
								}}>UnFolow</button>
								:
								<button disabled={isClicked.some( id => id=== el.id )} onClick={()=> {
									processFollow(el.id);
								}}>Follow</button>
								}
						</div>);}
						)}
					</div>
			);
}

export default Users;
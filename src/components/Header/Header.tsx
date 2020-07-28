import React from 'react';
import h from "./Header.module.css";
import {NavLink} from 'react-router-dom';

type PropsType = {
	auth: {
		email: string | null,
		id: number | null,
		login: string | null,
		isAuth: boolean,
	},
	Logout: () => Promise<void>,
};

let Header: React.FC<PropsType> = (props) =>{
		return(
			<header className={h.header}>
				<div className={h.block_login}>
					{props.auth.isAuth?
					(<div>
						<span>{props.auth.login}</span>
						<span onClick={()=>{props.Logout()}}>Logout</span>
					</div>):
					(<div>
						<NavLink to="/login">Login</NavLink>
					</div>)
				}
				</div>
			</header>
			);
}

export default Header;
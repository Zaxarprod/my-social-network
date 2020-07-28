import React from 'react';
import {NavLink} from 'react-router-dom';
import n from './Nav.module.css';

const Nav: React.FC<{}> = () => {
		return(
			<nav className={n.nav}>
				<div className={n.item + ' ' + n.prof}><NavLink to="/profile" activeClassName={n.active}></NavLink></div>
				<div className={n.item + ' ' + n.mess}><NavLink to="/dialogs" activeClassName={n.active}></NavLink></div>
				<div className={n.item + ' ' + n.news}><NavLink to="/news" activeClassName={n.active}></NavLink></div>
				<div className={n.item + ' ' + n.users}><NavLink to="/users" activeClassName={n.active}></NavLink></div>
			</nav>
		);
}

export default Nav;
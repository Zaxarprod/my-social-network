import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import Nav from "./components/Nav/Nav";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import FullPartScreen from './components/FullPartScreen/FullPartScreen';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {InitializateAppThunkCreator} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import StyleNav from './components/StyleNav/StyleNav'
import store, {GlobalStateType} from './redux/redux-store';
import {Provider} from 'react-redux';
import './index.css';

class App extends Component<mapStateToPropsType & mapDispatchToPropsType>{

	componentDidMount(){
		this.props.InitializateAppThunkCreator();
	}

	render(){
		if(!this.props.initializated){
			return (<Preloader />);
		}
		return(
			<div className={this.props.stylesFullPartScreen?'app-wrapper-full':'app-wrapper-part'}>
				<StyleNav />
				<HeaderContainer/>
				<Nav />
				<div className= {"app-wrapper-prev-content"}>

				</div>
				<div className="app-wrapper-content">
					<Route path ='/profile/:userId?' render={()=> {
						return <ProfileContainer />;
					}
					} />
					<Route path ='/dialogs' render={()=> {
						return <DialogsContainer />;
					}
					} />
					<Route path='/music' render={()=><Music />} />
					<Route path='/news' render={()=> <News />} />
					<Route path='/settings' render={()=> <Settings />} />
					<Route path='/users' render={()=> <UsersContainer />} />
					<Route path='/login' render={()=> <Login />} />
					<FullPartScreen />
				</div>
			</div>
		);
	}
}

type mapStateToPropsType = {
	initializated: boolean,
	stylesFullPartScreen: boolean,
};

type mapDispatchToPropsType = {
	InitializateAppThunkCreator: () => void,
}

let manStateToProps = (state: GlobalStateType): mapStateToPropsType => ({
	initializated: state.app.initializated,
	stylesFullPartScreen: state.mode.stylesFullPartScreen,
	
});

let AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(manStateToProps , {InitializateAppThunkCreator,}),
)(App);

const MainApp: React.FC<{}> = (props) =>{

	return (
		<BrowserRouter>
			<Provider store = {store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
}

export default MainApp;
import dialogsReducer from './dialogs-reducer.js';
import profileReducer from './profile-reducer.js';


let store = {
	getState(){
		return this._state;
	},
	_state : {
		profile: {
			posts: [
			{id:1, header: "Head1", description: "description1", likes: 1},
			{id:2, header: "Head2", description: "description2", likes: 2},
			{id:3, header: "Head3", description: "description3", likes: 3},
			{id:4, header: "Head4", description: "description4", likes: 4},
			{id:5, header: "Head5", description: "description5", likes: 5},
			],
			newText: '',
		},
		dialogs:{
			dialogs:[
		{id:1, name: "Jhon"},
		{id:2, name: "Jhon2"},
		{id:3, name: "Jhon3"},
		{id:4, name: "Jhon4"},
		{id:5, name: "Jhon5"},
			],
			newMessageText: '',
		messages:[
		{id:1, message: "Jhon"},
		{id:2, message: "Jhon2"},
		{id:3, message: "Jhon3"},
		{id:4, message: "Jhon4"},
		{id:5, message: "Jhon5"},
			],
		},
	},
	rerender(state){},
	subscribes(observe){
		this.rerender = observe;
	},


	dispatch (action){
		this._state.dialogs = dialogsReducer(this._state.dialogs, action);
		this._state.profile = profileReducer(this._state.profile, action);
		debugger;

		this.rerender(this._state);	
	}

	

}

export default store; 
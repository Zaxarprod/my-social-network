import React from 'react';

class Status extends React.Component {
	state = {
		editMode: false,
		status: this.props.status,
	}

	activateEditMode = () =>{
		this.setState({
			editMode: true,
		});
	}

	deactivateEditMode = () =>{
		this.setState({
			editMode: false,
		});
		this.props.updateStatus(this.state.status);
	}
	onChangeStatus = (e) =>{
		this.setState({
			status: e.currentTarget.value,
		});
	}

	componentDidUpdate(prevProps,prevState){
		if(prevProps.status !== this.props.status){
			this.setState({
				status: this.props.status,
			});
		}

	}

	render(){
		return (
			<div style={{marginBottom:'1vw'}}>
				{!this.state.editMode && 
				<div>
					<span onClick={this.activateEditMode}>{this.props.status?this.props.status:'Введите статус'}</span>
				</div>
				}
				{this.state.editMode &&
				<div>
					<input autoFocus={true} onChange={this.onChangeStatus} 
					onBlur={this.deactivateEditMode} value={this.state.status}/>
				</div>
				}
			</div>
		);
	}
}

export default Status;
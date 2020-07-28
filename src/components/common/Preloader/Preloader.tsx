import React from 'react';

type PropsType = {

};

let Preloader: React.FC<PropsType> = (props) => {
	return (
		<div style={{position:'absolute',top:'40vh',textAlign:'center'}}>
			<img src="https://big-marine.ruhotel.su/new_1/images/loading_spinner.gif" style={{width:'10%'}}/>
		</div>
	);
}

export default Preloader;
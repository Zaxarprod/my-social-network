import React from 'react';
import style from './Paginator.module.css';

type PropsTYpe = {
	totalCount: number
	pageCount: number
	currentPage: number
	SetCur: (numb:number) => void
}

const Paginator: React.FC<PropsTYpe> = ({totalCount, pageCount, currentPage, SetCur,}) =>{
	let count = Math.ceil(totalCount/pageCount);
	let counts = [];
	for(let i=1; i<count+1; i++){
		counts[i-1] = i;
	}
	return(
		<>
			{counts.map((el)=>{
				const classes = ((el===currentPage) && style.selectedPage) + ' ' + style.pageNavigator;
				return (
					<span className={classes}
					onClick={()=> SetCur(el)}>
									{el}{' '} 
					</span>
				);
			})
			}
		</>
	);
}

export default Paginator;
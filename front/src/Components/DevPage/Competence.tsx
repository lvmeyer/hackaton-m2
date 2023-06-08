import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';


function Competence(props) {
	console.log('nom de competence',props);

	return (
		<>
					<p className="mb-1">{props.competence}</p>
					<div className='d-flex flex-row'>
						<div className="progress rounded">
							<div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
						</div>
						<p>XP: 80%</p>
					</div>
		</>
	);
}

export default Competence;

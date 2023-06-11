import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

const Badge = (props : any) => {

	return (
		<>
			<div className="d-flex flex-row align-items-center mb-1">
            <p className="mb-1">Badge : </p>
				<div className="mb-0 ">
					<div className="badges text-sm font-weight-bold">{props.badges.badge}</div>
				</div>
			</div>
		</>
	);
};

export default Badge;

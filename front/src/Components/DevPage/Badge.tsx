import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

const Badge : React.FC = () => {
	const [badges, setBadges] = useState<any[]>([]);
	const { userInfo } = useSelector((state) => state.auth);

	
	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem('userInfo')).id;
		fetch(`http://localhost:3000/badges/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then(
				(data) => {
					console.log('DATA: ',data)
					setBadges(data)
        });
	}, []);


	return (
		<>
            <p className="mb-1">badge : </p>
		</>
	);
};

export default Badge;

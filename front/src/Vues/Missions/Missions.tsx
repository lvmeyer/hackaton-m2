import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Missions() {
	const [missions, setMissions] = useState([]);
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		fetch('http://localhost:3000/missions', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const m = data.map((el) => {
					return {
						id: el.id,
						title: el.title,
						entreprise: el.entreprise,
						startMission: new Date(el.startMission).toLocaleDateString(),
						endMission: new Date(el.endMission).toLocaleDateString(),
					};
				});
				setMissions(m);
			});
	}, []);

	const hundleDeleteFormation = async (missionId) => {
		try {
			const res = await fetch(`http://localhost:3000/missions/${missionId}`, {
				mode: 'cors',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem('userInfo')).access_token
					}`,
				},
				body: JSON.stringify({ missions }),
			});
		} catch (error: any) {
			console.error(error);
		}
		toast.success('Mission Supprimée avec succès !', {
			position: toast.POSITION.TOP_RIGHT,
		});
		setMissions(missions.filter((mission) => mission.id !== missionId));
	};

	return (
		<>
			<div className='titles-dashboard'>
				<h1 className='h1-carbon'>Missions</h1>
				{userInfo && userInfo.role === 'RH' ? (
					<Link className='btn carbon-btn-vert' to='/missions/create'>
						Créer une mission
					</Link>
				) : (
					<></>
				)}
			</div>
			<table className='table table-hover'>
				<thead>
					<tr>
						<th scope='col'>Titre</th>
						<th scope='col'>Entreprise</th>
						<th scope='col'>Date de début</th>
						<th scope='col'>Date de fin</th>
						{/* <th scope='col'>Points</th> */}
						{userInfo && userInfo.role === 'RH' ? (
							<th scope='col'>Actions</th>
						) : (
							<></>
						)}
					</tr>
				</thead>
				<tbody className='table-missions'>
					{missions.map((mission) => (
						<tr key={mission.id} className='ttt'>
							<td>
								<img src='data:image/png;base64,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' />
								{mission.title}
							</td>
							<td>{mission.entreprise}</td>
							<td>{mission.startMission}</td>
							<td>{mission.endMission}</td>
							{/* <td>{mission.points}</td> */}
							{userInfo && userInfo.role === 'RH' ? (
								<td>
									<button
										type='button'
										onClick={() => hundleDeleteFormation(mission.id)}
										className='btn carbon-btn'
									>
										Supprimer
									</button>
								</td>
							) : (
								<></>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default Missions;

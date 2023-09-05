import React, { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalInfo from '../ModalInfo';

const TableauFormations: React.FC = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [formations, setFormations] = useState<any[]>([]);
	const [formationsTerminees, setFormationsTerminees] = useState<any[]>([]);
	const { userInfo } = useSelector((state) => state.auth);

	const switchTab = (index: number) => {
		setTabIndex(index);
	};

	useEffect(() => {
		// const userId = JSON.parse(localStorage.getItem('userInfo')).id;
		fetch(
			`http://localhost:3000/formations/user?email=${
				JSON.parse(localStorage.getItem('userInfo')).email
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('userInfo')).access_token,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setFormations(data);
			});

		fetch(
			`http://localhost:3000/formations/user/accomplished?email=${
				JSON.parse(localStorage.getItem('userInfo')).email
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('userInfo')).access_token,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setFormationsTerminees(data);
				console.log(formationsTerminees);
			});
	}, []);

	const rejoindreFormation = (index: number) => {
		toast.success(
			"Vous avez rejoint la formation avec succès !\nVous recevrez un mail avec les informations concernant les dates et l'organisation de ces séances"
		);
	};

	return (
		<div className='container mt-5'>
			<div className='row'>
				<ModalInfo />
				<div className='col'>
					<button
						className={`btn carbon-btn ${tabIndex === 0 ? 'active' : ''}`}
						onClick={() => switchTab(0)}
					>
						Formations disponibles
					</button>
					<button
						className={`btn carbon-btn ${tabIndex === 1 ? 'active' : ''}`}
						onClick={() => switchTab(1)}
					>
						Formations terminées
					</button>
				</div>
			</div>

			<div className='row mt-3'>
				<div className='col'>
					{tabIndex === 0 ? (
						<ul className='list-group'>
							<li className='list-group-item header-row'>
								<div className='row'>
									<div className='col'>
										<strong>Titre de la Formation</strong>
									</div>
									<div className='col'>
										<strong>Formateur Expert</strong>
									</div>
									<div className='col'>
										<strong></strong>
									</div>
									{/* <div className="col">
                    <strong>Date</strong>
                  </div> */}
								</div>
							</li>
							{formations.map((formation, index) => (
								<li className='list-group-item' key={index}>
									<div className='row'>
										<div className='col'>{formation.title}</div>
										<div className='col'>{formation.former}</div>
										<div className='col'>
											<button
												className='btn btn-primary'
												onClick={() => rejoindreFormation(index)}
											>
												Rejoindre
											</button>
										</div>
										{/* <div className='col'>12/10</div> */}
									</div>
								</li>
							))}
						</ul>
					) : (
						<ul className='list-group'>
							<li className='list-group-item header-row'>
								<div className='row'>
									<div className='col'>
										<strong>Titre de la Formation</strong>
									</div>
									<div className='col'>
										<strong>Formateur Expert</strong>
									</div>
								</div>
							</li>
							{formationsTerminees.map((formation, index) => (
								<li className='list-group-item' key={index}>
									<div className='row'>
										<div className='col'>✅ {formation.title}</div>
										<div className='col'>{formation.former}</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default TableauFormations;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableauFormations from '../Components/DevPage/TableauFormations';
import Competence from '../Components/DevPage/Competence';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profil: React.FC = () => {
	const isAvailable = true; // Remplacez par la variable de disponibilité réelle du développeur

	const { userInfo } = useSelector((state) => state.auth);
	const [password, setPassword] = useState('');
	const [competences, setCompetences] = useState<any[]>([]);

	const handleUpdatePassword = async (e: any) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3000/users/updatepassword', {
				mode: 'cors',
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem('userInfo')).access_token
					}`,
				},
				body: JSON.stringify({ password }),
			});

			// navigate('/home');
		} catch (error: any) {
			toast.error(error.data.message);
			console.error(error);
		}
		toast.success('Success Notification !', {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem('userInfo')).id || 'eeee';
		console.log('userrrr', userId);
		fetch(`http://localhost:3000/users/${userId}/competences`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
			.then((response) => response.json())
			.then(
				(data) => (
					setCompetences(data.competences),
					console.log('DATAS:', data.competences)
				)
			);
	}, []);

	return (
		<section style={{ backgroundColor: '#eee' }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-4">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: '150px' }}
								/>
								<h5 className="my-3">{userInfo.email}</h5>
								<p className="text-muted mb-1">Full Stack Developer</p>
								<p className="text-muted mb-4">{userInfo.role}</p>
							</div>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="card mb-4">
							<div className="card-body">
								<div className="row">
									<div className="col-sm-3">
										<p className="mb-0">Email</p>
									</div>
									<div className="col-sm-9">
										<p className="text-muted mb-0">{userInfo.email}</p>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<p className="mb-0">Modifier mon Mot de Passe</p>
									</div>
									<div className="col-sm-9">
										<p className="text-muted mb-0">
											<input
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</p>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-4">
										<button className="mb-0" onClick={handleUpdatePassword}>
											Changer le mot de passe
										</button>
										<ToastContainer />
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<div className="d-flex align-items-center">
											<p className="align-self-center">Disponibilité :</p>
											<div
												className={`ms-2 rounded-circle ${
													isAvailable
														? 'bg-success'
														: 'bg-success border border-dark'
												}`}
												style={{ width: '20px', height: '20px' }}
											></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{userInfo && userInfo.role === 'USER' ? (
							<div className="row">
								<div className="col-md-12">
									<div className="card mb-4 mb-md-0">
										<div className="card-body">
											<p className="mb-4">
												<span className="text-primary font-italic me-1">
													assigment
												</span>{' '}
												Project Status
											</p>

											{competences.map((comp, index) => (
												<Competence key={index} competence={comp} />
											))}
										</div>
									</div>
								</div>
							</div>
						) : null}
					</div>
					<TableauFormations />
				</div>
			</div>
		</section>
	);
};

export default Profil;

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateMission() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [entreprise, setEntreprise] = useState('');
	const [startMission, setStartMission] = useState('');
	const [endMission, setEndMission] = useState('');
	const [points, setPoints] = useState('');
	const [level, setLevel] = useState('');
	const [utilisateur, setUtilisateur] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const mission = {
			title,
			description,
			entreprise,
			startMission,
			endMission,
			points,
			level: '432a985b-80c9-4cff-a33f-dc1c39006cdf',
		};

		try {
			const res = await fetch('http://localhost:3000/missions', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem('userInfo')).access_token
					}`,
				},
				body: JSON.stringify({ ...mission }),
			});
		} catch (error: any) {
			toast.error(error.data.message);
			console.error(error);
		}

		navigate('/missions');
	};

	return (
		<>
			<div className='titles-dashboard'>
				<h1 className='h1-carbon'>Nouvelle mission</h1>
				<Link className='btn carbon-btn' to='/missions'>
					Retour
				</Link>
			</div>
			<form className='form-missions' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title'>Titre</label>
					<input
						type='text'
						onChange={(e) => setTitle(e.target.value)}
						className='form-control'
						placeholder='Titre de la mission'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Description</label>
					<textarea
						className='form-control'
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						placeholder='Description de la mission'
					></textarea>
				</div>
				<div className='form-group'>
					<label htmlFor='entreprise'>Entreprise</label>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setEntreprise(e.target.value)}
						placeholder='Entreprise'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='date_debut'>Date de début</label>
					<input
						type='date'
						className='form-control'
						onChange={(e) => setStartMission(e.target.value)}
						placeholder='Date de début'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='date_fin'>Date de fin</label>
					<input
						type='date'
						className='form-control'
						onChange={(e) => setEndMission(e.target.value)}
						placeholder='Date de fin'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='points'>Points</label>
					<input
						type='number'
						className='form-control'
						onChange={(e) => setPoints(e.target.value)}
						placeholder='Points'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='level'>Niveau</label>
					<select className='form-control' id='niveau'>
						<option>Junior</option>
						<option>Confirmé</option>
						<option>Expert</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='utilisateur'>Utilisateur</label>
					<select className='form-control'>
						<option>Pierre Boitelle</option>
						<option>Dan Levy</option>
					</select>
				</div>
				<button type='submit' className='btn carbon-btn btn-create'>
					Créer la mission
				</button>
			</form>
		</>
	);
}

export default CreateMission;

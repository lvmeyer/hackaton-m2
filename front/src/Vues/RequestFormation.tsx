import { useState } from 'react';

function RequestFormation() {
	const [formationsDemandees, setFormationsDemandees] = useState([
		{
			id: 1,
			employe: 'Odessa Chesneau',
			formation: 'Javascript niveau 4',
		},
		{
			id: 2,
			employe: 'Odessa Chesneau',
			formation: 'PHP niveau 2',
		},
	]);

	const removeFormation = async () => {
		const replace = formationsDemandees.splice(1, 1);
		setFormationsDemandees(replace);

		fetch(`http://localhost:3000/users/requestformation`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	return (
		<>
			<div className='titles-dashboard'>
				<h1 className='h1-carbon'>Demandes de formations</h1>
			</div>
			<table className='table table-hover'>
				<thead>
					<tr>
						<th scope='col'>Employé</th>
						<th scope='col'>Formation</th>
						<th scope='col'></th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{formationsDemandees.map((f) => (
						<tr key={f.id}>
							<td>{f.employe}</td>
							<td>{f.formation}</td>
							<td>
								<button
									onClick={removeFormation}
									type='button'
									className='btn btn-primary'
								>
									Valider
								</button>
							</td>
							<td>
								<button
									onClick={removeFormation}
									type='button'
									className='btn btn-danger'
								>
									Refuser
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default RequestFormation;

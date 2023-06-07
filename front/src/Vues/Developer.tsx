import React from 'react';
import { FaJs, FaJava, FaPython } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilimg from '../../public/img/dev.jpg';
import Badge from '../Components/DevPage/Badge';
import TableauFormations from '../Components/DevPage/TableauFormations';

const Developer: React.FC = () => {
	const isAvailable = true; // Remplacez par la variable de disponibilité réelle du développeur

	return (
		<div className="container dev-profil-section">
			<div className="d-flex align-items-center justify-content-around ">
				<div className="d-flex flex-column align-items-center">
					<div
						className="rounded-circle overflow-hidden"
						style={{ width: '250px', height: '250px' }}
					>
						<img
							src={profilimg}
							alt="Profil"
							className="img-fluid"
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
					</div>
					<h2 className="mt-3">Richard Blyat</h2>

					<div className="d-flex align-items-center">
						<p className="align-self-center">Disponibilité :</p>
						<div
							className={`ms-2 rounded-circle ${
								isAvailable ? 'bg-success' : 'bg-success border border-dark'
							}`}
							style={{ width: '10px', height: '10px' }}
						></div>
					</div>
				</div>

				<div className="d-flex col flex-column align-items-center">
					<div className="d-flex flex-row ">
						<Badge />
						<Badge />
					</div>
					<div className="d-flex flex-row ">
						<Badge />
						<Badge />
					</div>
				</div>
			</div>

			<TableauFormations />
		</div>
	);
};

export default Developer;

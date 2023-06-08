import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TableauFormations from '../Components/DevPage/TableauFormations';
import Badge from '../Components/DevPage/Badge';

const Profil: React.FC = () => {
  const isAvailable = true; // Remplacez par la variable de disponibilité réelle du développeur

	const { userInfo } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');

  const handleUpdatePassword = async (e: any) => {
    
	e.preventDefault();

	try {
			const res = await fetch('http://localhost:3000/users/updatepassword', {
		 	mode: 'cors',
		 	method: 'PATCH',
		 	headers: {
		 		'Content-Type': 'application/json',
				'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).access_token}`
		 	},
		 	body: JSON.stringify({ password }),
		});

		// navigate('/home');
	} catch (error: any) {
		console.error(error);
	}
};

  return (
    <section style={{ backgroundColor: '#eee'}}>
      <div className="container py-5">

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                <h5 className="my-3">John Smith</h5>
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <hr />
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
                    <button className='mb-0' onClick={handleUpdatePassword}>Changer le mot de passe</button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <div className="d-flex align-items-center">
                      <p className="align-self-center">Disponibilité :</p>
                      <div
                        className={`ms-2 rounded-circle ${
                          isAvailable ? 'bg-success' : 'bg-success border border-dark'
                        }`}
                        style={{ width: '20px', height: '20px' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</p>
                    <Badge />
                    <Badge />
                    <Badge />
                    <Badge />
                    <Badge />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableauFormations />
        </div>
      </div>
    </section>
  );
};

export default Profil;

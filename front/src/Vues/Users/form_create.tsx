import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const newUser = { email, password, firstname, lastname};

        try {
            const res = await fetch('http://0.0.0.0:3000/authentication/register', {
            mode: 'cors',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).access_token}`
            },
            body: JSON.stringify({...newUser}),
            
		});
	    } catch (error: any) {
        toast.error(error.data.message);
        console.error(error);
        }      
        
        navigate("/users");

    };

    return (
        <>
            <div className="titles-dashboard">
                <h1 className="h1-carbon">Nouvel utilisateur</h1>
                <Link className="btn carbon-btn" to="/users">Retour</Link>
            </div>
            <form className="form-missions" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Nom</label>
                    <input type="text" onChange={(e) => setLastname(e.target.value)} className="form-control" placeholder="Nom" />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Prénom</label>
                    <input type="text" onChange={(e) => setFirstname(e.target.value)} className="form-control" placeholder="Prénom de famille" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="utilisateur">Rôle</label>
                    <select className="form-control" >
                        <option>Utilisateur</option>
                        <option>Administrateur</option>
                    </select>
                </div>
                <button type="submit" className="btn carbon-btn btn-create">Ajouter nouvel utilisateur</button>
            </form>
        </>
    );
}

export default CreateUser;
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Formation() {

    const [formations, setFormations] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/formations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
        })
            .then(response => response.json())
            .then(
                data => (setFormations(data)));
            
        
    }, []);

    const hundleDeleteFormation = async (formationId) => {
        try {
            const res = await fetch(`http://localhost:3000/formations/${formationId}`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem('userInfo')).access_token
                    }`,
                },
                body: JSON.stringify({ formations }),
            });
        } catch (error: any) {
            console.error(error);
        }
		toast.success('Formation Supprimé avec succès !', {
			position: toast.POSITION.TOP_RIGHT,
		});
        setFormations(formations.filter((formation) => formation.id !== formationId));

    };


    return (
        <>
            <div className="titles-dashboard">
                <h1 className="h1-carbon">Formations</h1>
                <Link className="btn carbon-btn" to="/formations/create">Créer une formation</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Formateur</th>
                        <th scope="col">Suppression</th>
                    </tr>
                </thead>
                <tbody>
                    {formations.map((formation) => (
                        <tr key={formation.id}>
                        <td>{formation.title}</td>
                        <td>{formation.former}</td>
                        <td>
                            <button
                            type="button"
                            onClick={() => hundleDeleteFormation(formation.id)}
                            className="btn btn-danger"
                            >
                            Supprimer
                            </button>
                        </td>
                        <ToastContainer />
                        </tr>
                    ))}
                    </tbody>

            </table>
        </>

    );
}

export default Formation;
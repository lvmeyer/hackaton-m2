import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';


function Missions() {

//get all missions with fetch
const [missions, setMissions] = useState([]);
useEffect(() => {
    fetch('http://localhost:3000/missions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
    })
        .then(response => response.json())
        .then(
            data => (setMissions(data)));
        
    
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
            <div className="titles-dashboard">
                <h1>Missions</h1>
                <Link className="btn carbon-btn" to="/missions/create">Créer une mission</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date de début</th>
                        <th scope="col">Date de fin</th>
                        <th scope="col">Points</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {missions.map(mission => (
            <tr key={mission.id}>
              <td>{mission.title}</td>
              <td>{mission.description}</td>
              <td>{mission.startMission}</td>
              <td>{mission.endMission}</td>
              <td>{mission.points}</td>
              <td><button
                            type="button"
                            onClick={() => hundleDeleteFormation(mission.id)}
                            className="btn carbon-btn"
                            >
                            Supprimer
                            </button>
                </td>
            </tr>
          ))}
                </tbody>
            </table>
        </>

    );
}

export default Missions;
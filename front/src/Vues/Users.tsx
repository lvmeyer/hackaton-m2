import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Users() {

//get all users with fetch
const [users, setUsers] = useState([]);
useEffect(() => {
    fetch('http://localhost:3000/missions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
    })
        .then(response => response.json())
        .then(
            data => (setUsers(data)));
        
    
}, []);


    return (
        <>
            <div className="titles-dashboard">
                <h1>Tout les utilisateurs (côté RH)</h1>
                <Link className="btn carbon-btn" to="/users/create">Créer un utilisateur</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">email</th>
                        <th scope="col">Disponibilité</th>
                        <th scope="col">Date de début</th>
                        <th scope="col">Date de fin</th>
                        <th scope="col">Points</th>
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
            </tr>
          ))}
                </tbody>
            </table>
        </>

    );
}

export default Users;
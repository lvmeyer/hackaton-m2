import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Users() {

//get all missions with fetch
const [users, setUsers] = useState([]);
useEffect(() => {
    fetch('http://localhost:3000/users', {
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
                <h1>Missions (côté RH)</h1>
                <Link className="btn carbon-btn" to="/users/create">Ajouter un nouvel utilisateur</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
            <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
            </tr>
          ))}
                </tbody>
            </table>
        </>

    );
}

export default Users;
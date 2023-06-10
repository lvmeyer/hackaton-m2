import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

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

const hundleDeleteFormation = async (userId) => {
    try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('userInfo')).access_token
                }`,
            },
            body: JSON.stringify({ users }),
        });
    } catch (error: any) {
        console.error(error);
    }
    toast.success('Mission Supprimée avec succès !', {
        position: toast.POSITION.TOP_RIGHT,
    });
    setUsers(users.filter((user) => user.id !== userId));

};

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
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
            <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                            <button
                            type="button"
                            onClick={() => hundleDeleteFormation(user.id)}
                            className="btn btn-danger"
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

export default Users;
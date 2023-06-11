import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function Users() {

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
                <h1 className="h1-carbon">Nos développeurs</h1>
                <Link className="btn carbon-btn" to="/users/create">Ajouter un nouvel utilisateur</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col"></th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
            <tr key={user.id}>
                <td><img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: '75px' }}
								/>{user.firstname} {user.lastname}</td>
                <td></td>
                <td>{user.email}</td>
                <td>
                            <button
                            type="button"
                            onClick={() => hundleDeleteFormation(user.id)}
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

export default Users;
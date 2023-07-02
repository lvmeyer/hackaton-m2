import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function WebMasters() {

const [users, setUsers] = useState([]);
useEffect(() => {
    fetch('http://localhost:3000/users/webmasters', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
    })
        .then(response => response.json())
        .then(
            data => (setUsers(data))
        );
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

const hundleValidUser = async (userId, userEmail) => {
    try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            mode: 'cors',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('userInfo')).access_token
                }`,
            },
            body: JSON.stringify({
                isValid: true,
                email: userEmail,
            }),
        });
    } catch (error: any) {
        console.error(error);
    }
    toast.success('Web master validé avec succès !', {
        position: toast.POSITION.TOP_RIGHT,
    });

    setUsers(users);

};

    return (
        <>
            <div className="titles-dashboard">
                <h1 className="h1-carbon">Nos Web Masters</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col"></th>
                        <th scope="col">Email</th>
                        <th scope="col">Validé</th>
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
                    {user.isValid ? (
                        <span className="badge bg-success">Validé</span>
                    ) : (
                        <span className="badge bg-danger">Non Validé</span>
                    )}
                </td>
                <td>
                            <button
                            type="button"
                            onClick={() => hundleDeleteFormation(user.id)}
                            className="btn carbon-btn"
                            >
                            Supprimer
                            </button>

                            {user.isValid ? (
                                ""
                            ) : (
                                <button
                                type="button"
                                onClick={() => hundleValidUser(user.id, user.email)}
                                className="btn btn-success"
                                >
                                    Valider
                                </button>
                            )}
                        </td>
            </tr>
          ))}
                </tbody>
            </table>



         

        </>

    );
}

export default WebMasters;
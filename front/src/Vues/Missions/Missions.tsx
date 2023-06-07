import React from "react";
import { Link } from "react-router-dom";

function Missions() {
    return (
        <>
            <div className="titles-dashboard">
                <h1>Missions (côté RH)</h1>
                <Link className="btn carbon-btn" to="/missions/create">Créer une mission</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Entreprise</th>
                        <th scope="col">Date de début</th>
                        <th scope="col">Date de fin</th>
                        <th scope="col">Points</th>
                        <th scope="col">Niveau</th>
                        <th scope="col">Utilisateur</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Développeur fulstack</th>
                        <td>Fiche de poste: developpeur gngngngn nodejs gngngn </td>
                        <td>Google</td>
                        <td>01/01/2021</td>
                        <td>01/01/2023</td>
                        <td>150</td>
                        <td>Junior</td>
                        <td>Pierre Boitelle</td>
                        <td>edit mission</td>
                    </tr>
                    <tr>
                        <th scope="row">Developpeur Angular</th>
                        <td>Fiche de poste</td>
                        <td>ESGI</td>
                        <td>01/01/2024</td>
                        <td>01/02/2021</td>
                        <td>100</td>
                        <td>Confirmé</td>
                        <td>Dan Levy</td>
                        <td>edit mission</td>
                        <td><Link to="/missions/create"></Link></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Missions;
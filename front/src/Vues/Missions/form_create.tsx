import React from "react";
import { Link } from "react-router-dom";

function CreateMission() {
    return (
        <>
            <div className="titles-dashboard">
                <h1>Nouvelle mission (côté RH)</h1>
                <Link className="btn carbon-btn" to="/missions">Retour</Link>
            </div>
            <form className="form-missions">
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text" className="form-control" placeholder="Titre de la mission" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" rows={3} placeholder="Description de la mission"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="entreprise">Entreprise</label>
                    <input type="text" className="form-control" placeholder="Entreprise" />
                </div>
                <div className="form-group">
                    <label htmlFor="date_debut">Date de début</label>
                    <input type="date" className="form-control" placeholder="Date de début" />
                </div>
                <div className="form-group">
                    <label htmlFor="date_fin">Date de fin</label>
                    <input type="date" className="form-control" placeholder="Date de fin" />
                </div>
                <div className="form-group">
                    <label htmlFor="points">Points</label>
                    <input type="number" className="form-control" placeholder="Points" />
                </div>
                <div className="form-group">
                    <label htmlFor="niveau">Niveau</label>
                    <select className="form-control" id="niveau">
                        <option>Junior</option>
                        <option>Confirmé</option>
                        <option>Expert</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="utilisateur">Utilisateur</label>
                    <select className="form-control" >
                        <option>Pierre Boitelle</option>
                        <option>Dan Levy</option>
                    </select>
                </div>
                <button type="submit" className="btn carbon-btn btn-create">Créer la mission</button>
            </form>


        </>
    );
}

export default CreateMission;
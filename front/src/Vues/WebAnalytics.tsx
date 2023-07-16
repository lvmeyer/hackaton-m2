import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function WebAnalytics() {

    const [link, setLink] = useState([]);
    const [user, setUser] = useState([]);
    const [sites, setSites] = useState([]);

    useEffect(() => {

        const userId = JSON.parse(localStorage.getItem('userInfo')).id;

        fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
        })
        .then(response => response.json())
        .then(
            data => (setUser(data))
        );

        fetch('http://localhost:3000/users/'+userId+'/sites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
        })
        .then(response => response.json())
        .then(
            data => (setSites(data.sites))
        );
    }, []);


    const handleSubmitNewSite = async (e: any) => {
		e.preventDefault();

        const userID = user.id;

		try {
			const res = await fetch('http://localhost:3000/sites', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ link, user: userID }),
			});

            if (res.status === 201) {
                toast.success('Votre site a bien été ajouté !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error('Une erreur est survenue !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

		} catch (error: any) {
			toast.error(error.data.message);
			console.error(error);
		}
	};

    return (
        <>
            <div className="titles-dashboard">
                <h1 className="h1-carbon">Notre plateforme de Web Analytics</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">APP_ID</th>
                        <th scope="col">Site web</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site: any) => (
                        <tr key={site.id}>
                            <td>{site.id}</td>
                            <td>{site.link}</td>
                            <td>
                                <Link to={"/webanalytics/" + site.id} className="btn btn-primary">
                                    Voir les statistiques
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1 className="h1-carbon">Ajouter un site web</h1>

            <form className="row" onSubmit={handleSubmitNewSite}>

                <div className="form-outline mb-4 col-md-6">
					<input
					type="text"
					placeholder="Entrez le lien de votre site web"
					value={link}
					onChange={(e) => setLink(e.target.value)}
					className="form-control"
					/>
				</div>

				<button type="submit" className="btn btn-primary btn-block mb-4 col-md-3">
					Ajouter un site
				</button>
			</form>

        </>

    );
}

export default WebAnalytics;
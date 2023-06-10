import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function CreateFormation() {
    const [title, setTitle] = useState('');
    const [former, setDescription] = useState('');
    
    const navigate = useNavigate();


    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const mission = { title, former };

        try {
            const res = await fetch('http://localhost:3000/formations', {
            mode: 'cors',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).access_token}`
            },
            body: JSON.stringify({...mission}),
            
		});
		// navigate('/home');
	    } catch (error: any) {
        toast.error(error.data.message);
        console.error(error);
        }
		toast.success('Success Notification !', {
			position: toast.POSITION.TOP_RIGHT,
		});
        
        // set data
        navigate("/formation");

    };

    return (
        <>
            <div className="titles-dashboard">
                <h1>Nouvelle Formation (côté RH)</h1>
                <Link className="btn carbon-btn" to="/formation">Retour</Link>
            </div>
            <form className="form-missions" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Titre de la Formation" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Formateur</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Formateur Expert" />
                </div>
                <button type="submit" className="btn carbon-btn btn-create">Créer la Formation</button>
                <ToastContainer />
            </form>

        </>
    );
}

export default CreateFormation;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TunnelView = () => {
  const [tunnels, setTunnels] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchTunnels();
    }, []);

  const fetchTunnels = async () => {
    try {
        fetch('http://localhost:3000/tunnels/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
        })
        .then(response => response.json())
        .then((data) => {
            setTunnels(data);
        });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='h1-carbon'>
      <h1>Tunnels de conversion</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Commentaire</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(tunnels) && tunnels.length === 0 ? (
          <tr>
            <td colSpan={4}>Pas de commentaire encore</td>
          </tr>
        ) : (
            tunnels.map((tunnel: any) => (
            <tr key={tunnel.id}>
              <td>{tunnel.id}</td>
              <td>{tunnel.comment}</td>
            <td>{tunnel.tag}</td>
            </tr>
          ))
        )}

        </tbody>
      </table>
        <div>
          <h1>Nouveau commentaire:</h1>
            <div className="form-outline mb-4 col-md-6">
            <input
                type="text"
                placeholder="Entrez le lien de votre site web"
                className="form-control"
            />
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4 col-md-3">
            Ajouter un site
            </button>
            </div>

    </div>
  );
};

export default TunnelView;


import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function TagView() {
  const { userInfo } = useSelector((state) => state.auth);

   const [comments, setComments] = useState([]);
   const [newComments, setNewComments] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/tags/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
    })
    .then(response => response.json())
    .then((data) => {
        setComments(data);
  });
}, []);

  const handleSubmitNewTag = async (e: any) => {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:3000/tags', {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comments : newComments }),
        });

        if (res.status === 201) {
            toast.success('Votre tag a bien été ajouté !', {
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

const handleEditComment = async (commentId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/tags/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
      },
      body: JSON.stringify({ comment: 'Nouveau commentaire' }),
    });

    if (res.status === 200) {
      toast.success('Commentaire mis à jour !', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error: any) {
    toast.error(error.data.message);
    console.error(error);
  }
}

const handleDeleteComment = async (commentId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/tags/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
      },
    });

    if (res.status === 204) {
      toast.success('Commentaire supprimé !', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error('Erreur lors de la suppression du commentaire', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error: any) {
    toast.error(error.data.message);
    console.error(error);
  }
}


  return (
    <div className="h1-carbon">
      <div className="titles-dashboard">
        <h1 className="h1-carbon">Notre plateforme de Tags</h1>
      </div>
      <h1>Tout les tags</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Commentaire</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(comments) && comments.length === 0 ? (
          <tr>
            <td colSpan={4}>No commentaire encore</td>
          </tr>
        ) : (
          comments.map((comment: any) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.comment}</td>
              <td><button onClick={() => handleEditComment(comment.id)} className="btn btn-primary">Modifier</button></td>
              <td><button onClick={() => handleDeleteComment(comment.id)} className="btn btn-primary">Supprimer</button></td>
            </tr>
          ))
        )}

        </tbody>
      </table>
      <h1>Ajouter un tag</h1>
      <form className="row" onSubmit={handleSubmitNewTag}>

        <div className="form-outline mb-4 col-md-6">
          <input
            type="text"
            placeholder="Entrez le lien de votre site web"
            value={newComments}
            onChange={(e) => setNewComments(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4 col-md-3">
        Ajouter un site
        </button>
      </form>
    </div>
)};

export default TagView;

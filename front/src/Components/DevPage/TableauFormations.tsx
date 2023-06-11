import React, { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableauFormations: React.FC = (props: any) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formations, setFormations] = useState<any[]>([]);
  const { userInfo } = useSelector((state) => state.auth);


  const formationsAVenir = [props.formations];
  const formationsTerminees = [
    ['Formation A', 'Formateur A'],
    ['Formation B', 'Formateur B'],
    ['Formation C', 'Formateur C'],
  ];

  const switchTab = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    fetch(`http://localhost:3000/formations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA:' ,data);
        setFormations(data);
      });
  }, []);

  const rejoindreFormation = (index: number) => {
    // Logique pour rejoindre la formation
    toast.success('Vous avez rejoint la formation avec succès !');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <button
            className={`btn carbon-btn me-2 ${tabIndex === 0 ? 'active' : ''}`}
            onClick={() => switchTab(0)}
          >
            Formations à venir
          </button>
          <button
            className={`btn carbon-btn ${tabIndex === 1 ? 'active' : ''}`}
            onClick={() => switchTab(1)}
          >
            Formations terminées
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          {tabIndex === 0 ? (
            <ul className="list-group">
              <li className="list-group-item header-row">
                <div className="row">
                  <div className="col">
                    <strong>Titre de la Formation</strong>
                  </div>
                  <div className="col">
                    <strong>Formateur Expert</strong>
                  </div>
                  <div className="col">
                    <strong>Rejoindre</strong>

                  </div>
                </div>
              </li>
              {userInfo && userInfo.role === 'ADMINISTRATOR' ? (
                <>
                {formations.map((formation, index) => (
                  <li className="list-group-item" key={index}>
                    <div className="row">
                      <div className="col">{formation.title}</div>
                      <div className="col">{formation.former}</div>
                      <div className="col">
                        <button
                          className="btn btn-primary"
                          onClick={() => rejoindreFormation(index)}
                        >
                          Rejoindre
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                
                </>
              ) : null}
            </ul>
          ) : (
            <ul className="list-group">
              <li className="list-group-item header-row">
                <div className="row">
                  <div className="col">
                    <strong>Titre de la Formation</strong>
                  </div>
                  <div className="col">
                    <strong>Formateur Expert</strong>
                  </div>
                </div>
              </li>
              {formationsTerminees.map((formation, index) => (
                <li className="list-group-item" key={index}>
                  <div className="row">
                    <div className="col">{formation[0]}</div>
                    <div className="col">{formation[1]}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TableauFormations;

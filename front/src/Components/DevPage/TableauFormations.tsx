import React, { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalInfo from '../ModalInfo';

const TableauFormations: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formations, setFormations] = useState<any[]>([]);
  const { userInfo } = useSelector((state) => state.auth);


  const formationsTerminees = [
    ['Javascript, niveau 1', 'Jean Dupont'],
    ['Javascript, niveau 2', 'Jean Dupont'],
    ['Javascript, niveau 3', 'Jean Dupont'],
    ['Javascript, niveau 4', 'Jean Dupont'],
    ['Javascript, niveau 5', 'Jean Dupont'],
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
        setFormations(data);
      });
  }, []);

  const rejoindreFormation = (index: number) => {
    toast.success('Vous recevrez un mail avec le lien de la formation la veille de la formation!');
  };

  return (
    <div className="container mt-5">
      <div className="row">
      <ModalInfo />
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
                  <div className="col">
                    <strong>Date</strong>
                  </div>
                </div>
              </li>
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
                    <div className="col">12/10</div>
                  </div>
                </li>
              ))}
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

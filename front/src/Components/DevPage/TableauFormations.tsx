import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TableauFormations: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0); // Index du tableau actuellement affiché

  const formationsAVenir = ['Formation 1', 'Formation 2', 'Formation 3'];
  const formationsTerminees = ['Formation A', 'Formation B', 'Formation C'];

  const switchTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <button
            className={`btn carbon-btn me-2 ${
              tabIndex === 0 ? 'active' : ''
            }`}
            onClick={() => switchTab(0)}
          >
            Formations à venir
          </button>
          <button
            className={`btn carbon-btn ${
              tabIndex === 1 ? 'active' : ''
            }`}
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
              {formationsAVenir.map((formation, index) => (
                <li key={index} className="list-group-item">
                  {formation}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="list-group">
              {formationsTerminees.map((formation, index) => (
                <li key={index} className="list-group-item">
                  {formation}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableauFormations;

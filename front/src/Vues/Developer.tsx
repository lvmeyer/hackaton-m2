import React from 'react';
import { FaJs, FaJava, FaPython } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Developer: React.FC = () => {
  return (
    <div className="container d-flex align-items-center">
      <div className="col d-flex flex-column align-items-center">
      <div
          className="rounded-circle overflow-hidden"
          style={{ width: '250px', height: '250px' }}
        >
          <img
            src="../../public/img/dev.jpg"
            alt="Profil"
            className="img-fluid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h2>Oh le J t'y as mit le Kimono ?</h2>
      </div>

      <div className="col">
        <h3>Badges :</h3>
        <div className="d-flex align-items-center">
          <FaJs className="me-2" />
          <span>JavaScript</span>
          <div className="progress flex-grow-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '80%' }}
              aria-valuenow={80}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <FaJava className="me-2" />
          <span>Java</span>
          <div className="progress flex-grow-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '60%' }}
              aria-valuenow={60}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <FaPython className="me-2" />
          <span>Python</span>
          <div className="progress flex-grow-1">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '40%' }}
              aria-valuenow={40}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;

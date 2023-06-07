import React from "react";
import { FaJs, FaJava, FaPython } from 'react-icons/fa';


function Badge() {
    return (
        <>
        <div className="d-flex align-items-center badge-items">
          <FaJava className="me-2 badge-logo" />
          <div className="d-flex flex-column">
            <h4>Java</h4>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: '60%' }}
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <p>XP: 60%</p>
          </div>
        </div>
        </>
    );
}

export default Badge;
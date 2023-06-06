import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    <>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Homepage</Link>
                    </li>
                    <li>
                        <Link to="/formation">formation</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/login">se connecter</Link>
                    </li>
                    <li>
                        <Link to="/register">créer un compte</Link>
                    </li>
                </ul>
            </nav>  
        </div>
    </>

}

export default Navbar;
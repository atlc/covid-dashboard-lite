import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-dark mb-3 p-2 shadow-lg">
            <NavLink activeClassName="btn-light text-dark" className="btn btn-outline-light m-2" to="/" exact>
                Overview
            </NavLink>
            <NavLink activeClassName="btn-light text-dark" className="btn btn-outline-light m-2" to="/risk-levels" exact>
                Risk Levels
            </NavLink>
            <NavLink activeClassName="btn-light text-dark" className="btn btn-outline-light m-2" to="/about" exact>
                About
            </NavLink>
        </div>
    );
};

export default Navbar;

import React from 'react';

import { NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export const BrandIcon = props => (
  <div className="brand-icon">
    <img src="content/images/logo-education-click.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    {/*<span className="navbar-version">{VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}</span>*/}
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center text-black">
      <span className="header-text-color p-2">Home</span>
    </NavLink>
  </NavItem>
);

export const About = () => (
  <NavItem>
    <NavLink tag={Link} to="/about" className="d-flex align-items-center">
      <span className="text-boxdark p-2">About</span>
    </NavLink>
  </NavItem>
);
export const Contact = () => (
  <NavItem>
    <NavLink tag={Link} to="/contact" className="d-flex align-items-center">
      <span className="text-boxdark p-2">Contact</span>
    </NavLink>
  </NavItem>
);
export const UpcommingMenu = () => (
  <NavItem>
    <NavLink tag={Link} to="/upcoming-class" className="d-flex align-items-center w-44">
      <span className="text-boxdark p-2">Upcoming Class</span>
    </NavLink>
  </NavItem>
);

import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
      <nav className="lg:container mx-auto text-gray-50 font-bold flex flex-row py-4 px-12 gap-8">
          <NavLink to="/">Booking Manager</NavLink>
          <ul className="flex flex-row gap-8 ml-12">
              <li>
                  <NavLink to="/">Home</NavLink>
              </li>
              <li>
                  <NavLink to="/reservations">Reservations</NavLink>
              </li>
          </ul>
      </nav>
    );
}

export default Navigation;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Wanderlust</span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/create" 
              className={({isActive}) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Create Itinerary
            </NavLink>
            <NavLink 
              to="/itineraries" 
              className={({isActive}) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Itineraries
            </NavLink>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create"
              onClick={closeMenu}
              className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Create Itinerary
            </NavLink>
            <NavLink
              to="/itineraries"
              onClick={closeMenu}
              className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`
              }
            >
              Itineraries
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

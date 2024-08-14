import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-nsdr-dark bg-opacity-90 py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          nsdr.co
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-nsdr-light hover:text-nsdr-accent transition-colors">
            Home
          </Link>
          <Link to="/category/sleep" className="text-nsdr-light hover:text-nsdr-accent transition-colors">
            Sleep
          </Link>
          <Link to="/category/focus" className="text-nsdr-light hover:text-nsdr-accent transition-colors">
            Focus
          </Link>
          <Link to="/category/relax" className="text-nsdr-light hover:text-nsdr-accent transition-colors">
            Relax
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
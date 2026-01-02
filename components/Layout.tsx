
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-hero overflow-hidden flex flex-col">
      {/* Navigation Overlay */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter">
          WINDOW<span className="text-blue-400">MASTER</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path ? 'text-blue-400' : 'text-gray-200 hover:text-white'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="absolute bottom-4 left-0 w-full text-center text-xs text-white/50 pointer-events-none">
        &copy; 2024 WindowMaster. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;

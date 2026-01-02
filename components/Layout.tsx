
import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-hero overflow-hidden flex flex-col">
      {/* Header Area */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Link to="/" className="flex items-center">
          <img 
            src="https://img.voted.io/o/1740617307044-a6344d51-6efc-40cb-ba14-5da6b42b93f1.png" 
            alt="KCC HomeCC" 
            className="h-8 md:h-12 object-contain drop-shadow-md"
          />
        </Link>
        
        {/* Navigation removed as requested */}
      </nav>

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

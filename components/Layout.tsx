
import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-hero overflow-hidden flex flex-col">
      {/* Header Area */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <Link to="/" className="flex items-center">
          <div className="bg-white p-1.5 rounded-xl shadow-lg hover:scale-105 transition-transform">
            <img 
              src="https://cdn.imweb.me/thumbnail/20251230/d98b7f1519224.png" 
              alt="KCC HomeCC" 
              className="h-12 md:h-14 w-auto object-contain"
              onError={(e) => {
                // 이미지 로드 실패 시 텍스트 로고로 대체 (Safe fallback)
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  const span = document.createElement('span');
                  span.className = "px-2 font-black text-blue-900 text-lg";
                  span.innerText = "KCC HomeCC";
                  target.parentElement.appendChild(span);
                }
              }}
            />
          </div>
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

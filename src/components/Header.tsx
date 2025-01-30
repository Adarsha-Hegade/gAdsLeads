import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#c8a97e] w-8 h-8" />
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">Magnific</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
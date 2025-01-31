import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <img src="/images/magnific.svg" alt="Magnific Logo" width={150} height={50} />
      </div>
    </header>
  );
};

export default Header;

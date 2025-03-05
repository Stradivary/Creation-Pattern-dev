import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 px-6 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Creational Design Patterns</h1>
        <p className="text-xl opacity-80 max-w-3xl">
          Explore the five main creational design patterns - Singleton, Factory Method, 
          Abstract Factory, Builder, and Prototype - with interactive examples
        </p>
      </div>
    </header>
  );
};

export default Header;
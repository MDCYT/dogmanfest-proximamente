import React from 'react';

const CenteredDiv = () => {
  return (
    <div className="flex items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] bg-[url(https://cdn.dogmanfestperu.com/background.png)] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Your content goes here */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Proximamente Dogman Fest</h1>
        <p className="text-xl text-white mt-4">¡El mejor evento canino del Perú!</p>
      </div>
    </div>
  );
};

export default CenteredDiv;

import React, { useState } from 'react';
import AIContentGenerator from './AIContentGenerator';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      <AIContentGenerator />
    </div>
  );
}

export default HomePage;

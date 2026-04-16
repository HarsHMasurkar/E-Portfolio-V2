/**
 * Main App Component
 * Now configured as a dvdrod-inspired single page application instance.
 */

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import DvdrodSinglePage from './components/DvdrodSinglePage';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  // Fetch portfolio data from backend
  usePortfolioData();

  // Removed LoadingScreen "main reload page" as requested by user.
  // Render single page directly.
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f0f0f',
            color: '#f0f0f0',
            border: '1px solid #222',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
      
      <DvdrodSinglePage />
    </>
  );
}

export default App;

import { useEffect } from 'react';
import Array from './components/Array';
import Controls from './components/Controls';
import { ArrayProvider, useArray } from './context/ArrayContext';
import Navbar from './components/Navbar';

function App() {
  const { generateArray } = useArray();

  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4">
        <Array />
        <Controls />
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <ArrayProvider>
      <App />
    </ArrayProvider>
  );
}

export default AppWrapper;
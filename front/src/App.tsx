import React from 'react';
import Home from './pages/Home';


function App() {
  const address = "Antananarivo"
  
  return (
    <>
    <Home address={address}/>
    </>
  );
}

export default App;

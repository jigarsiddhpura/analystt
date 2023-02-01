import React from 'react'
import './App.css';
import PaginatedItems from './components/home';

function App() {
  return (
    <div className="App">
      <PaginatedItems itemsPerPage={3}/>
    </div>
  );
}

export default App;

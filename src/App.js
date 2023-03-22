import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/Home';
import { Navigate } from 'react-router-dom';

import EditBookPage from './pages/EditBookPage';
import { useSelector } from 'react-redux';

function App() {
  const bookId = useSelector((state) => state?.books?.bookId);
    let { userId } = useParams();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":userId" element={<EditBookPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

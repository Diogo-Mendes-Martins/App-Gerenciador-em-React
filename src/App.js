// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Produtos from './pages/Produtos';
import Categorias from './pages/Categorias';

function App() {
  return (
    <Router>
      <div style={{ padding: '10px' }}>
        {/* Menu de navegação */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/usuarios" style={{ marginRight: '10px' }}>Usuários</Link>
          <Link to="/produtos" style={{ marginRight: '10px' }}>Produtos</Link>
          <Link to="/categorias">Categorias</Link>
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

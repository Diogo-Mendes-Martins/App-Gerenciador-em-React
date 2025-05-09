import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Produtos from './pages/Produtos';
import Categorias from './pages/Categorias';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/usuarios">Usuários</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/categorias">Categorias</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </Router>
  );
}

export default App;

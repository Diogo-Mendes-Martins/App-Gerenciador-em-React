// src/pages/Usuarios.jsx
import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, addDoc } from '../firebase';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState('');

  const carregarUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    setUsuarios(querySnapshot.docs.map(doc => doc.data().nome));
  };

  const adicionarUsuario = async () => {
    if (novoUsuario.trim() !== '') {
      await addDoc(collection(db, 'usuarios'), { nome: novoUsuario });
      setNovoUsuario('');
      carregarUsuarios(); // recarrega
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuários (Firebase)</h2>
      <input value={novoUsuario} onChange={e => setNovoUsuario(e.target.value)} />
      <button onClick={adicionarUsuario}>Adicionar</button>
      <ul>
        {usuarios.map((nome, index) => <li key={index}>{nome}</li>)}
      </ul>
    </div>
  );
}

export default Usuarios;

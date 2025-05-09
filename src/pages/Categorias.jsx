import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');

  const refCategorias = collection(db, 'categorias');

  const carregarCategorias = async () => {
    try {
      const querySnapshot = await getDocs(refCategorias);
      const dados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategorias(dados);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const adicionarCategoria = async () => {
    if (!novaCategoria.trim()) return;

    try {
      await addDoc(refCategorias, { nome: novaCategoria.trim() });
      setNovaCategoria('');
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
    }
  };

  const excluirCategoria = async (id) => {
    try {
      await deleteDoc(doc(db, 'categorias', id));
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  const iniciarEdicao = (categoria) => {
    setEditandoId(categoria.id);
    setNomeEditado(categoria.nome);
  };

  const salvarEdicao = async (id) => {
    try {
      await updateDoc(doc(db, 'categorias', id), { nome: nomeEditado });
      setEditandoId(null);
      setNomeEditado('');
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div>
      <h2>Categorias</h2>

      <input
        type="text"
        placeholder="Nova categoria"
        value={novaCategoria}
        onChange={(e) => setNovaCategoria(e.target.value)}
      />
      <button onClick={adicionarCategoria}>Adicionar</button>

      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>
            {editandoId === cat.id ? (
              <>
                <input
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                />
                <button onClick={() => salvarEdicao(cat.id)}>Salvar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {cat.nome}{' '}
                <button onClick={() => iniciarEdicao(cat)}>Editar</button>
                <button onClick={() => excluirCategoria(cat.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;

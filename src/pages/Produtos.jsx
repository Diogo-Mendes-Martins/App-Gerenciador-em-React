// src/pages/Produtos.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', estoque: '' });

  const carregarProdutos = async () => {
    const querySnapshot = await getDocs(collection(db, 'produtos'));
    const dados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProdutos(dados);
  };

  const adicionarProduto = async () => {
    const { nome, preco, estoque } = novoProduto;
    if (!nome || !preco || !estoque) return;

    await addDoc(collection(db, 'produtos'), {
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
    });

    setNovoProduto({ nome: '', preco: '', estoque: '' });
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço"
        value={novoProduto.preco}
        onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
      />
      <input
        type="number"
        placeholder="Estoque"
        value={novoProduto.estoque}
        onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
      />
      <button onClick={adicionarProduto}>Adicionar Produto</button>

      <ul>
        {produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco} - Estoque: {p.estoque}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;

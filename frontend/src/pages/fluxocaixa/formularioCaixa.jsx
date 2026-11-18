import { useState } from 'react';
import { cadastrarTransacao } from '../services/caixaService';

export default function FormularioCaixa({ onCadastro }) {
  const [tipo, setTipo] = useState('INCOME');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('FIXED');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const dados = {
        description,
        amount: Number(amount),
        type: tipo,
        category: tipo === 'EXPENSE' ? category : null,
        date
      };

      await cadastrarTransacao(dados);

      setMensagem('Movimentação cadastrada com sucesso!');
      setDescription('');
      setAmount('');

      if (onCadastro) onCadastro();

    } catch (error) {
      setMensagem(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nova movimentação</h2>

      <label>Tipo</label>

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="INCOME">Entrada</option>
        <option value="EXPENSE">Saída</option>
      </select>

      <label>Descrição</label>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ex: Venda de produtos"
        required
      />

      <label>Valor</label>

      <input
        type="number"
        step="0.01"
        min="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Ex: 1500"
        required
      />

      {tipo === 'EXPENSE' && (
        <>
          <label>Categoria da despesa</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="FIXED">Fixa</option>
            <option value="VARIABLE">Variável</option>
          </select>
        </>
      )}

      <label>Data</label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">
        Cadastrar movimentação
      </button>

      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}
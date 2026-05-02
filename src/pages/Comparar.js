import { useState } from 'react';

const Comparar = ({ dados }) => {
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [seguradoraSelecionada, setSeguradoraSelecionada] = useState('');

  const modelosFiltrados = dados.modelos.filter(
    (modelo) => !marcaSelecionada || modelo.marca === marcaSelecionada
  );

  const modeloAtual = dados.modelos.find(
    (modelo) => modelo.id.toString() === modeloSelecionado
  );

  const seguradoraAtual = dados.seguradoras.find(
    (seguradora) => seguradora.id.toString() === seguradoraSelecionada
  );

  return (
    <section className="comparar">
      <div className="form-grid">
        <label>
          Marca
          <select
            value={marcaSelecionada}
            onChange={(event) => {
              setMarcaSelecionada(event.target.value);
              setModeloSelecionado('');
            }}
          >
            <option value="">Selecione uma marca</option>
            {dados.marcas.map((marca) => (
              <option key={marca.id} value={marca.nome}>
                {marca.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Modelo
          <select
            value={modeloSelecionado}
            onChange={(event) => setModeloSelecionado(event.target.value)}
            disabled={!modelosFiltrados.length}
          >
            <option value="">Selecione um modelo</option>
            {modelosFiltrados.map((modelo) => (
              <option key={modelo.id} value={modelo.id}>
                {modelo.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Seguradora
          <select
            value={seguradoraSelecionada}
            onChange={(event) => setSeguradoraSelecionada(event.target.value)}
          >
            <option value="">Selecione uma seguradora</option>
            {dados.seguradoras.map((seguradora) => (
              <option key={seguradora.id} value={seguradora.id}>
                {seguradora.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="resultado">
        <h2>Resultado da Comparação</h2>
        {modeloAtual && seguradoraAtual ? (
          <div className="card">
            <h3>{modeloAtual.nome}</h3>
            <p><strong>Marca:</strong> {modeloAtual.marca}</p>
            <p><strong>Seguradora:</strong> {seguradoraAtual.nome}</p>
            <p><strong>Cobertura:</strong> {seguradoraAtual.cobertura}</p>
            <p>
              <strong>Preço estimado:</strong> R$ {(modeloAtual.valorBase + seguradoraAtual.preco).toFixed(2)}
            </p>
          </div>
        ) : (
          <p>Escolha marca, modelo e seguradora para visualizar a comparação.</p>
        )}
      </div>
    </section>
  );
};

export default Comparar;

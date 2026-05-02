import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Comparar from '../pages/Comparar';
import Admin from '../pages/Admin';

const Principal = () => {
  const [dados, setDados] = useState({ marcas: [], modelos: [], seguradoras: [] });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch('/dados.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        return response.json();
      })
      .then((data) => {
        const marcas = data.marcas || [];
        const modelos = (data.modelos || []).map((modelo) => ({
          ...modelo,
          marca:
            marcas.find((marca) => marca.id === modelo.marcaId)?.nome ||
            modelo.marca ||
            '',
        }));

        setDados({
          marcas,
          modelos,
          seguradoras: data.seguradoras || [],
        });
        setLoading(false);
      })
      .catch((error) => {
        setErro(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="principal">
      {loading ? (
        <div className="loading">Carregando dados...</div>
      ) : erro ? (
        <div className="error">{erro}</div>
      ) : (
        <Routes>
          <Route path="/" element={<Home dados={dados} />} />
          <Route path="/comparar" element={<Comparar dados={dados} />} />
          <Route path="/admin" element={<Admin dados={dados} setDados={setDados} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </main>
  );
};

export default Principal;

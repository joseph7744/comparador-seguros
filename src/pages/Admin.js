import { useEffect, useState } from 'react';

const entityMap = {
  marca: 'marcas',
  modelo: 'modelos',
  seguradora: 'seguradoras',
};

const initialForm = {
  marca: { nome: '' },
  modelo: { marca: '', nome: '', valorBase: '' },
  seguradora: { nome: '', cobertura: '', preco: '' },
};

const Admin = ({ dados, setDados }) => {
  const [entidade, setEntidade] = useState('marca');
  const [form, setForm] = useState(initialForm[entidade]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setForm(initialForm[entidade]);
    setEditId(null);
  }, [entidade]);

  const lista = dados[entityMap[entidade]];

  const handleDelete = (id) => {
    setDados((prev) => ({
      ...prev,
      [entityMap[entidade]]: prev[entityMap[entidade]].filter((item) => item.id !== id),
    }));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ ...item });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm[entidade]);
  };

  const nextId = () => {
    const values = lista.map((item) => item.id || 0);
    return values.length ? Math.max(...values) + 1 : 1;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const key = entityMap[entidade];
    let nextItem = { id: editId || nextId() };

    if (entidade === 'marca') {
      nextItem = { ...nextItem, nome: form.nome.trim() };
    }

    if (entidade === 'modelo') {
      nextItem = {
        ...nextItem,
        marca: form.marca,
        nome: form.nome.trim(),
        valorBase: Number(form.valorBase) || 0,
      };
    }

    if (entidade === 'seguradora') {
      nextItem = {
        ...nextItem,
        nome: form.nome.trim(),
        cobertura: form.cobertura,
        preco: Number(form.preco) || 0,
      };
    }

    setDados((prev) => {
      const current = prev[key];
      const updated = editId
        ? current.map((item) => (item.id === editId ? nextItem : item))
        : [...current, nextItem];

      return {
        ...prev,
        [key]: updated,
      };
    });

    handleCancel();
  };

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h2>Administração de Dados</h2>
        <select value={entidade} onChange={(event) => setEntidade(event.target.value)}>
          <option value="marca">Marca</option>
          <option value="modelo">Modelo</option>
          <option value="seguradora">Seguradora</option>
        </select>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        {entidade === 'marca' && (
          <label>
            Nome da marca
            <input
              value={form.nome}
              onChange={(event) => setForm({ ...form, nome: event.target.value })}
              placeholder="Ex: Toyota"
            />
          </label>
        )}

        {entidade === 'modelo' && (
          <>
            <label>
              Marca
              <select
                value={form.marca}
                onChange={(event) => setForm({ ...form, marca: event.target.value })}
              >
                <option value="">Selecione a marca</option>
                {dados.marcas.map((marca) => (
                  <option key={marca.id} value={marca.nome}>
                    {marca.nome}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Nome do modelo
              <input
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
                placeholder="Ex: Onix"
              />
            </label>
            <label>
              Valor base
              <input
                type="number"
                value={form.valorBase}
                onChange={(event) => setForm({ ...form, valorBase: event.target.value })}
                placeholder="Ex: 4200"
              />
            </label>
          </>
        )}

        {entidade === 'seguradora' && (
          <>
            <label>
              Nome da seguradora
              <input
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
                placeholder="Ex: Seguro Alfa"
              />
            </label>
            <label>
              Cobertura
              <input
                value={form.cobertura}
                onChange={(event) => setForm({ ...form, cobertura: event.target.value })}
                placeholder="Ex: Completa"
              />
            </label>
            <label>
              Preço adicional
              <input
                type="number"
                value={form.preco}
                onChange={(event) => setForm({ ...form, preco: event.target.value })}
                placeholder="Ex: 1200"
              />
            </label>
          </>
        )}

        <div className="admin-actions">
          <button type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
          {editId && (
            <button type="button" className="button-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            {entidade === 'marca' && <th>Marca</th>}
            {entidade === 'modelo' && <>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Valor base</th>
            </>}
            {entidade === 'seguradora' && <>
              <th>Seguradora</th>
              <th>Cobertura</th>
              <th>Preço</th>
            </>}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {entidade === 'marca' && <td>{item.nome}</td>}
              {entidade === 'modelo' && (
                <>
                  <td>{item.marca}</td>
                  <td>{item.nome}</td>
                  <td>R$ {item.valorBase}</td>
                </>
              )}
              {entidade === 'seguradora' && (
                <>
                  <td>{item.nome}</td>
                  <td>{item.cobertura}</td>
                  <td>R$ {item.preco}</td>
                </>
              )}
              <td>
                <button type="button" onClick={() => handleEdit(item)}>
                  Editar
                </button>
                <button type="button" className="button-secondary" onClick={() => handleDelete(item.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Admin;

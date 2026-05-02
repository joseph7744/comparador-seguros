const Home = ({ dados }) => (
  <>
    <section className="cards">
      {dados.modelos.length === 0 ? (
        <p>Nenhum modelo disponível.</p>
      ) : (
        dados.modelos.map((modelo) => (
          <article key={modelo.id} className="card">
            <img
              src={`https://via.placeholder.com/320x180.png?text=${encodeURIComponent(modelo.nome)}`}
              alt={modelo.nome}
            />
            <div className="card-body">
              <h2>{modelo.nome}</h2>
              <p><strong>Marca:</strong> {modelo.marca}</p>
              <p><strong>Valor base:</strong> R$ {modelo.valorBase}</p>
              <p><strong>Cobertura sugerida:</strong> {dados.seguradoras[0]?.cobertura || 'Básica'}</p>
            </div>
          </article>
        ))
      )}
    </section>
  </>
);

export default Home;

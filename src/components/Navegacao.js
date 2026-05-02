import { NavLink } from 'react-router-dom';

const Navegacao = () => (
  <>
    <nav>
      <ul className="nav-list">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/comparar">Comparar</NavLink></li>
        <li><NavLink to="/admin">Admin</NavLink></li>
      </ul>
    </nav>
  </>
);

export default Navegacao;

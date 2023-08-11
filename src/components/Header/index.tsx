import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <section className="header-container">
      <Link to="/" className="header-button">
        Home
      </Link>
      <Link to="/empresas" className="header-button">
        Empresas
      </Link>
      <Link to="/empresas-inadimplentes" className="header-button">
        Inadimplentes
      </Link>
    </section>
  );
};

export default Header;

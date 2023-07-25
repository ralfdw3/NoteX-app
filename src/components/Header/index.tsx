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
    </section>
  );
};

export default Header;

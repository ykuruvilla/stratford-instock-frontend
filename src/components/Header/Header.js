import logo from "../../InStock-Logo.svg";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="navbar__logo-link">
          <img src={logo} className="navbar__logo" alt="instock-logo" />
        </NavLink>
        <ul className="navbar__list">
          <li className="navbar__list-item navbar__list-item--selected">
            <Link to="/warehouse">
              <span className="navbar__text"> Warehouses</span>
            </Link>
          </li>
          <li className="navbar__list-item navbar__list-item--unselected">
            <Link to="/inventory" className="navbar__inventory-link">
              <span className="navbar__text navbar__inventory-text">
                Inventory
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
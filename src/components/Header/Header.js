import logo from "../../assets/logos/instock-logo.svg";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";

const Header = ({ location }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__logo-container">
          <NavLink to="/warehouse" className="navbar__logo-link">
            <img src={logo} className="navbar__logo" alt="instock-logo" />
          </NavLink>
        </div>
        <ul className="navbar__list">
          <li
            className={`navbar__list-item ${
              location.pathname.includes("/warehouse")
                ? "navbar__list-item--selected"
                : "navbar__list-item--unselected"
            }`}
          >
            <Link to="/warehouse" className="navbar__warehouses-link">
              <span
                className={`navbar__text ${
                  location.pathname.includes("/warehouse")
                    ? "navbar__text--selected"
                    : "navbar__text--unselected"
                }`}
              >
                Warehouses
              </span>
            </Link>
          </li>
          <li
            className={`navbar__list-item ${
              location.pathname.includes("/inventory")
                ? "navbar__list-item--selected"
                : "navbar__list-item--unselected"
            }`}
          >
            <Link to="/inventory" className="navbar__inventory-link">
              <span
                className={`navbar__text ${
                  location.pathname.includes("/inventory")
                    ? "navbar__text--selected"
                    : "navbar__text--unselected"
                }`}
              >
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

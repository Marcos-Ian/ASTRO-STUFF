import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./Navbar.css";



const Navbar = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <header className="navbar-header">
      {/* Logo + Links */}
      <div className="navbar-left">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="navbar-logo">AstroStuff</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/moreastros"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            More Astros
          </NavLink>
        </nav>
      </div>


    </header>
  );
};

export default Navbar;

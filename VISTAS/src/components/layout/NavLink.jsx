import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const NavLink = ({ label, path }) => (
  <Link
    to={path}
    className="text-gray-900 text-nowrap hover:text-blue-400 transition-colors duration-200 font-medium"
  >
    {label}
  </Link>
);

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavLink;

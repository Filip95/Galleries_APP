import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";


function NavBar() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
  
    const dispatch = useDispatch();
  
    function handleLogout() {
      dispatch(logout());
    }
  
    return (
      <div>
        <nav>
          <li>
            <Link to="/galleries">Galleries</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/create-gallery">Create a gallery</Link>
              </li>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </nav>
        {activeUser && <h3>Hello, {activeUser.name}</h3>}
      </div>
    );
  }

  export default NavBar;
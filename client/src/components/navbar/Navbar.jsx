import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import "./navbar.css";

export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <span>MY-Peformance</span>
            </div>
            <div className="navbar-right">
                <ul className="navbar-right-ul">
                    <li className="navbar-right-ul-items">
                        {user ? (
                            <Link
                                to={`/home?user=${user.username}`}
                                className="link"
                            >
                                HOME
                            </Link>
                        ) : (
                            <Link to={`/`} className="link">
                                HOME
                            </Link>
                        )}
                    </li>
                    <li className="navbar-right-ul-items">
                        <Link to={"/home"} className="link">
                            {user ? "" : "ABOUT US"}
                        </Link>
                    </li>
                    <li className="navbar-right-ul-items">
                        <Link to={"/home"} className="link">
                            {user ? "" : "CONTACT US"}
                        </Link>
                    </li>
                    <li className="navbar-right-ul-items">
                        <Link to={"/"} onClick={handleLogout} className="link">
                            {user && "LOGOUT"}
                        </Link>
                    </li>
                    <li className="navbar-right-ul-items">
                        <Link to={"/home/settings"} className="link">
                            {user && "SETTINGS"}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

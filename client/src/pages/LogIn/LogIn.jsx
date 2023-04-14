import { useRef, useContext } from "react";
import { AuthContext } from "../../context/Context";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import "./login.css";

export default function LogIn() {
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", {
                username: username.current.value,
                password: password.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.location.replace(`/home?user=${res.data.username}`);
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <>
            {!isFetching ? (
                <div className="login">
                    <div className="login-left">
                        <img
                            src={require("./login.png")}
                            className="login-img"
                            alt="img"
                        />
                    </div>
                    <div className="login-right">
                        <span className="login-title">Log In</span>
                        <form className="login-form" onSubmit={handleLogin}>
                            <div>
                                <img
                                    src={require("./username1.png")}
                                    className="login-logo"
                                    alt="img"
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required="required"
                                    className="login-inp"
                                    ref={username}
                                />
                            </div>

                            <div>
                                <img
                                    src={require("./password2.png")}
                                    className="login-logo"
                                    alt="img"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required="required"
                                    className="login-inp"
                                    minLength={6}
                                    ref={password}
                                />
                            </div>

                            <button
                                type="submit"
                                title="Log In"
                                className="login-btn"
                                disabled={isFetching}
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

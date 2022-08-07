import { useState } from "react";
import axios from "axios";
import "./register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [error, setError] = useState(false);
    const [passeq , setPasseq] = useState(false);

    const handleRegister = async (e) =>{
        e.preventDefault();
        setError(false);
        if(password === repassword){
            try{
                const res = await axios.post("auth/register", {
                    username :username,
                    email :email,
                    password :password,
                });
                res.data && window.location.replace('/login');
            } catch(err){
                setError(true);
            }
        } else {
            setPasseq(true);
        }
    }

    return (
        <div className="register">
            <div className="register-left">
                <img
                    src={require("./register.png")}
                    className="register-img"
                    alt="Pic"
                />
            </div>
            <div className="register-right">
                <span className="register-title">Register</span>
                <form className="register-form" onSubmit={handleRegister}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            required="required"
                            className="register-inp"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            required="required"
                            className="register-inp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            required="required"
                            className="register-inp"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            required="required"
                            className="register-inp"
                            onChange={(e) => setRepassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="register-btn">
                        Register
                    </button>
                </form>
                {passeq && <span className="register-error">Both Password should be matching</span>}
                {error && <span className="register-error">Something went Wrong</span>}
            </div>
        </div>
    );
}

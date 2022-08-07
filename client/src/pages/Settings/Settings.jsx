import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Context";
import "./settings.css";

export default function Setting() {
    const { user, dispatch } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [error, setError] = useState(false);
    const [passeq , setPasseq] = useState(false);

    const handleUpdate = async (e) =>{
        e.preventDefault();
        setError(false);
        if(password === repassword){
            try{
                dispatch({type:"UPDATE_START"});
                const res = await axios.put(`/users/${user._id}`, {
                    userId : user._id,
                    username : user.username,
                    email : user.email,
                    password : password
                });
                dispatch({type:"UPDATE_SUCCESS" , payload:res.data});
                window.location.replace(`/home?user=${user.username}`);
            } catch (err){
                setError(true);
                dispatch({type:"UPDATE_FAILURE"});
            }
        } else {
            setPasseq(true);
        }
    }


    return (
        <div className="settings">
            <div className="settings-left">
                <span className="settings-title">Update Your Account</span>
                <form className="settings-form" onSubmit={handleUpdate}>
                    <div className="settings-input">
                        <input
                            type="password"
                            placeholder="New-Password"
                            required="required"
                            className="settings-inp"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            required="required"
                            className="settings-inp"
                            onChange={(e) => setRepassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="settings-btn settings-submit">
                            Update
                        </button>
                    </div>
                    {passeq && <span className="settings-error">Both Password should be matching</span>}
                    {error && <span className="settings-error">Something went Wrong</span>}
                </form>
            </div>
            <div className="settings-right">
                <img
                    src={require("./update.png")}
                    alt="img"
                    className="settings-img"
                />
            </div>
        </div>
    );
}

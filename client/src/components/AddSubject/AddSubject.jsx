import { useContext, useRef } from "react";
import { AuthContext } from "../../context/Context";
import axios from 'axios';
import "./addsubject.css";

export default function Addsubject(props) {
    const userData = useContext(AuthContext);
    const subRef = useRef();

    const handleAddSubject = async () => {
        try{
            const res = await axios.post("/subject", {
                username: userData.user.username,
                subject: subRef.current.value,
            });
            res.data.username && props.onCancel();
            window.location.reload();
        } catch(err){
            console.log(err);
        }
    };

    return (
        <>
            <div className="addsubject-backdrop" onClick={props.onCancel}></div>
            <div className="addsubject">
                <input
                    type="text"
                    placeholder="Enter subject Name"
                    required
                    className="addsubject-inp"
                    ref={subRef}
                />
                <div>
                    <button
                        className="addsubject-btn addsubject-add"
                        onClick={handleAddSubject}
                    >
                        Add
                    </button>
                    <button
                        className="addsubject-btn addsubject-cancel"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

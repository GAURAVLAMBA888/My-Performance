import "./marksdeleter.css";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function Marksdeleter(props) {
    const loc = useLocation();
    const indexRef = useRef();
    const subjectId = loc.pathname.split("/")[3];
    
    const handleDeleteMarks = async () => {
        const idOfMarksDeleted = props.cdata[indexRef.current.value]._id;
        const res = await axios.put(`/subject/${subjectId}/marks/${idOfMarksDeleted}`, {
            userId: subjectId,
        });
        res.data && props.onCancel();
        window.location.reload(false);
    };

    return (
        <>
            <div
                className="marksdeleter-backdrop"
                onClick={props.onCancel}
            ></div>
            <div className="marksdeleter">
                <input
                    type="number"
                    placeholder="Enter the index of x-axis of Data"
                    required
                    className="marksdeleter-inp"
                    ref={indexRef}
                />
                <div>
                    <button
                        className="marksdeleter-btn marksdeleter-add"
                        onClick={handleDeleteMarks}
                    >
                        Delete
                    </button>
                    <button
                        className="marksdeleter-btn marksdeleter-cancel"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

import "./marksupdater.css";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function MarksUpdater(props) {
    const loc = useLocation();
    const markRef = useRef();

    const subjectId = loc.pathname.split("/")[3];

    const handleAddMarks = async () => {
        const res = await axios.put(`/subject/${subjectId}/marks`, {
            marks: markRef.current.value,
            userId: subjectId,
        });
        res.data && props.onCancel();
        window.location.reload(false);
    };

    return (
        <>
            <div
                className="marksupdater-backdrop"
                onClick={props.onCancel}
            ></div>
            <div className="marksupdater">
                <input
                    type="number"
                    placeholder="Enter Data"
                    required
                    className="marksupdater-inp"
                    ref={markRef}
                />
                <div>
                    <button
                        className="marksupdater-btn marksupdater-add"
                        onClick={handleAddMarks}
                    >
                        Add
                    </button>
                    <button
                        className="marksupdater-btn marksupdater-cancel"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

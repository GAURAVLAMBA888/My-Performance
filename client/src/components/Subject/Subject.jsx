import { Link } from "react-router-dom";
import "./subject.css";

export default function Subject(props) {
    return (
        <div className="subject">
            <span className="subject-title">{props.s.subject}</span>
            <Link to={{ pathname:`/home/scorecard/${props.s._id}`}} className="link">
                <button className="subject-detail">Get Details</button>
            </Link>
        </div>
    );
}

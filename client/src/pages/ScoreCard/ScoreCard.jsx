import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import MarksUpdater from "../../components/MarksUpdater/MarksUpdater";
import MarksDeleter from "../../components/MarksDeleter/MarksDeleter";
import axios from "axios";
import "./scorecard.css";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
} from "recharts";

export default function ScoreCard() {
    const loc = useLocation();
    const subjectId = loc.pathname.split("/")[3];
    const [updater, setUpdater] = useState(false);
    const [deleter, setDeleter] = useState(false);
    const [cdata, setCdata] = useState([]);
    const [subjectTitle, setSubjectTitle] = useState("");
    const { user } = useContext(AuthContext);

    const openUpdater = () => {
        setUpdater(true);
    };

    const closeUpdater = () => {
        setUpdater(false);
    };

    const openDeleter = () => {
        setDeleter(true);
    };

    const closeDeleter = () => {
        setDeleter(false);
    };

    useEffect(() => {
        const fetchMarks = async () => {
            const mdata = await axios.get(`/subject/${subjectId}`);
            mdata.data.data.map((e) => {
                return e.date.toString();
            });
            const reqdata = mdata.data.data.map((e) => {
                return {
                    ...e,
                    date: new Date(e.date).toISOString().split("T")[0],
                };
            });
            setCdata(reqdata);
            setSubjectTitle(mdata.data.subject);
        };
        fetchMarks();
    }, [subjectId]);

    const handleDeleteSub = async () => {
        await axios.delete(`/subject/${subjectId}`, {
            data: { username: user.username },
        });
        window.location.replace(`/home?user=${user.username}`);
    };

    return (
        <div className="scorecard">
            <div className="scorecard-header">
                <span className="scorecard-title">{subjectTitle}</span>
                <button className="scorecard-update" onClick={openUpdater}>
                    Add Data
                </button>
                <button
                    className="scorecard-update scorecard-dm"
                    onClick={openDeleter}
                >
                    Delete Data
                </button>
                <button className="scorecard-delete" onClick={handleDeleteSub}>
                    Delete Subject
                </button>
            </div>
            <div className="scorecard-chart">
                <ResponsiveContainer width="70%" aspect={3}>
                    <LineChart data={cdata}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis interval={"preserveStartEnd"} />
                        <YAxis
                            dataKey={"marks"}
                            interval={"preserveStartEnd"}
                        />
                        <Legend />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgb(0, 255, 145,0.2)",
                            }}
                        />
                        <Line
                            type={"monotone"}
                            dataKey={"marks"}
                            stroke="#3182BD"
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {updater && <MarksUpdater onCancel={closeUpdater} />}
            {deleter && <MarksDeleter onCancel={closeDeleter} cdata={cdata} />}
        </div>
    );
}

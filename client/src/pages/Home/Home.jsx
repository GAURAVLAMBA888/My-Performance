import { useContext, useEffect, useState } from "react";
import Subject from "../../components/Subject/Subject";
import AddSubject from "../../components/AddSubject/AddSubject";
import "./home.css";
import axios from 'axios';
import { useLocation } from "react-router-dom";


export default function Home() {
    const [adder, setAdder] = useState(false);
	const [subs, setSubs] = useState([]);
    const loc = useLocation();
    const openAdder = () => {
        setAdder(true);
    };

    const CloseAdder = () => {
        setAdder(false);
    };

	useEffect (() => {
		const fetchSubjects = async () => {
			const res = await axios.get(`/subject${loc.search}`);
			setSubs(res.data);
		};
		fetchSubjects();
	}, [loc.search])
	
    return (
        <div className="home">
            <span className="home-title">My Subjects</span>
            <div className="home-container">
                    {subs.map((s) => (
						<Subject s={s} key={s._id}/>
					))} 
            </div>
            <button className="home-addsub" onClick={openAdder}>
                Add Subjects
            </button>
            {adder && <AddSubject onCancel={CloseAdder} />}
        </div>
    );
}

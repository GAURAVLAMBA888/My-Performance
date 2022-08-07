import { Link } from "react-router-dom";


import './logsign.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function LogSign() {

    useEffect(() => {
        Aos.init({duration: 2000});
    },[])

  return (
    <div className='logsign'>
        <div className='logsign-left'>
            <img src={require('./logsign.png')} alt=""  className='logsign-img' data-aos="zoom-in"/>
        </div>
        <div className='logsign-right' data-aos="zoom-in">
            <div className="logsign-right-info">
                <span className='logsign-right-head'>Let's Begin</span>
                <p className='logsign-right-para'>By clicking the login button. If you are not a user Please Sign In.<b>For Taking Demo use username = 'gkl', password = 'gkl123'</b>
                </p>
            </div>
            <div className='logsign-buttons'>
                <Link to={'/login'}>
                    <button className='logsign-login'>Log In</button>
                </Link>
                <Link to={'/register'}>
                    <button className='logsign-signin'>Register</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

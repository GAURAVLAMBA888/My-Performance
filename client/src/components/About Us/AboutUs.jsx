import './aboutus.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AboutUs() {

  useEffect(() => {
    Aos.init({duration: 2000});
  },[])

  return (
    <div className='aboutus'>
        <div className='aboutus-left' data-aos="zoom-in">
                <span className='aboutus-left-head'>About Us</span>
                <p className='aboutus-left-para'>This is a platform where you can submit your Data for different subject and see your the change visually with respect to the previous data.
                </p>
        </div>
        <div className='aboutus-right' data-aos="zoom-in">
            <img src={require('./graph.png')} alt=""  className='aboutus-img'/>
        </div>
    </div>
  )
}

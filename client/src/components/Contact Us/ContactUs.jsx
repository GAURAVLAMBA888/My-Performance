import './contactus.css'

export default function ContactUs() {
  return (
    <div className='contactus'>
        <div className='contactus-first'>
            <span className='contactus-first-txt'>CONTACT US</span>
        </div>
        <div className='contactus-second'>
            <p><i className="support-Icon fa-solid fa-phone-flip"></i>Phone No. : +91-9991119898</p>
            <p><i className="support-Icon fa-solid fa-envelope"></i>Email</p>
            <p><i className="support-Icon fa-solid fa-message"></i>Connect for support</p>
        </div>
        <div className="contactus-third">
        <i className="contactus-Icon fa-brands fa-facebook"></i>
        <i className="contactus-Icon fa-brands fa-twitter"></i>
        <i className="contactus-Icon fa-brands fa-instagram"></i>
        <i className="contactus-Icon fa-brands fa-whatsapp"></i>
      </div>

    </div>
  )
}

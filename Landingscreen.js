import React from 'react'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration: '2000'
});

function Landingscreen() {
    return(
        <div className='row landing justify-content-center' >
            <div className='col-md-9 my-auto text-center' style={{borderRight: '5px solid white'}}>
                <h2 data-aos='zoom-in' style={{color:'white', fontSize:'90px'}}>Welcome to sBooking!</h2>
                <h1 data-aos='zoom-out' style={{color:'white'}}>"There is only one boss, our guest!"</h1>
                <Link to ='/home'>
                <button className='btn' style={{color:'black', backgroundColor:'white', marginTop:'20px'}}>Search your Sportfield</button>
                </Link>
            </div>


        </div>
    )
}

export default Landingscreen
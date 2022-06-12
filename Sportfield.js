import React, {useState} from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AOS from 'aos';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import 'aos/dist/aos.css';
AOS.init({
    duration: '1000'
});




function Sportfield({sportfield, date, fromhour, tohour}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const avg =sportfield.reviews.reduce((sum, curr) => sum + Number(curr), 0) /sportfield.reviews.length;
      
    return(
       <div className='row bs' data-aos='flip-right'>
            <div className='col-md-6'>
                <img src={sportfield.imageurls[0]} className='smallimg' />
            </div>

            

            <div className='col-md-5'>
                <h1><b>{sportfield.name}</b></h1>
                <p><b>Maximum people allowed:</b> {sportfield.maxcount} people</p>
                <p><b>Phone Number:</b> {sportfield.phonenumber}</p>
                <p><b>Type of Sportfield:</b> {sportfield.type}</p>
               
            
                <div style={{float:'right'}}>

                {(date && fromhour && tohour) &&(
                   <Link to={`/book/${sportfield._id}/${date}/${fromhour}/${tohour}`}>
                   <button className='btn btn-primary m-2'>Book Now</button>
                 </Link>
                )}
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>

            <div style={{float:'right'}}>
              <Avatar size={50} style={{ backgroundColor: '#157812' }}><b>{avg} / 5</b></Avatar>
            </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{sportfield.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Carousel>

            {sportfield.imageurls.map(url=>{
                
               return <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100 bigimg"
                    src={url}
                />
                </Carousel.Item>

            })}

            
        </Carousel>

        <p>{sportfield.description}</p>    

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 

        </div>
    )

}

export default Sportfield
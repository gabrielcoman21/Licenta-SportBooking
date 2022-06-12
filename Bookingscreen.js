import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Carousel} from 'react-bootstrap'
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    duration: '1000'
});




function Bookingscreen({match}){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [sportfield, setSportfield] = useState();

    const sportfieldid = match.params.sportfieldid
    const date= match.params.date
    const fromhour = moment(match.params.fromhour, 'HH-mm')
    const tohour = moment(match.params.tohour, 'HH-mm')
    const totaltime = moment.duration(tohour.diff(fromhour)).asHours();
    const [totalamount, setTotalamount] = useState();
    

    useEffect(() => {
       
       const fetchData = async () => {
            
        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }

           try{ 
            setLoading(true);
            const data = await axios.post('/api/sportfields/getsportfieldbyid', {sportfieldid : match.params.sportfieldid});
            setSportfield(data.data);
            setTotalamount(data.data.rentperhour * totaltime)
            console.log(data.rentperhour)
            console.log(totalamount)
            setLoading(false);
        } catch(error){
            setLoading(false);
            setError(true);
            
        }
    }
      
       fetchData();
    
    }, []);



async function onToken(token)
{
    console.log(token);
    const bookingDetails={
        sportfield,
        userid:JSON.parse(localStorage.getItem('currentUser')).data._id,
        date,
        fromhour,
        tohour,
        totalamount, 
        totaltime,
        token

    }
    try {
        setLoading(true);
        const result = await axios.post('/api/bookings/booksportfield', bookingDetails)
        setLoading(false);
        Swal.fire('Congratulations', 'Your sportfield was booked successfully!', 'success').then(result=>{
            window.location.href='/profile'
        })
    } catch (error) {
        setLoading(false);
        Swal.fire('Congratulations', 'Something went wrong! Please try again!', 'error')
    }
}

 return(
     <div className='m-5' data-aos='flip-right'>
         {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

            <div className='row justify-content-center mt-10 bs'>

                <div className='col-md-6'>
                    <h1><b>{sportfield.name}</b></h1>

                    <div>
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
                    </div>
                </div>

                <div className='col-md-6'>


                    <div style={{textAlign: 'right'}}>
                        <h1><b>Booking Details</b></h1>
                        <hr/>
                        <p><b>Name:</b> {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                        <p><b>Date:</b> {match.params.date}</p>
                        <p><b>Starting hour:</b> {match.params.fromhour}</p>
                        <p><b>Ending hour:</b> {match.params.tohour}</p>
                        <p><b>Maximum people allowed:</b> {sportfield.maxcount} people</p>
                    </div>
                    

                    <div style={{textAlign: 'right'}}>
                        <h1><b>Amount</b></h1>
                        <hr/>
                        <p><b>Total hours:</b> {totaltime} hours</p>
                        <p><b>Rent per hour:</b> {sportfield.rentperhour} RON</p>
                        <p><b>Total amount:</b> {totalamount} RON</p>
                    </div>

                    <div style={{float:'right'}}>
                    
                        <StripeCheckout
                            amount={totalamount * 100}
                            token={onToken}
                            currency='RON'
                            stripeKey="pk_test_51L4idhBpNvaK4t2YbJNtMFBkWf1hzmg3Pbjz7UBkuikv5RacIOxNgf8EobMJvE6gFza5xBjYV7MRt9HOv9JIoX9S00TcxrMPGN"
                        >
                        <button className='btn btn-primary'>Pay Now</button>
                        </StripeCheckout>

                    </div>

                </div>

            </div>



         </div>)}
     </div>
 );
}
export default Bookingscreen
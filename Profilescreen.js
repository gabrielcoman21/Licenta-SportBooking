import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import axios from 'axios'
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import { Tag } from 'antd';
import { Modal, Button } from 'antd';
import { Rate } from 'antd';

const { TabPane } = Tabs;
function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }

    }, [])



    return (
        <div className='ml-3 mt-3 mr-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1" className='bs'>
                    <h1>My Profile</h1>
                    <hr />
                    <h1>Name: {user.data.name}</h1>
                    <h1>Email: {user.data.email}</h1>
                    <h1>Admin: {user.data.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user.data._id })).data;
                console.log(data);
                setBookings(data)
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }

        fetchData();
    }, [])


    async function cancelBooking(bookingid, sportfieldid) {
        try {
            setLoading(true);
            const result = await (await axios.post('/api/bookings/cancelbooking', { bookingid, sportfieldid })).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled successfully', 'succes').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong!', 'error')
        }
    }

    

    async function handleOk(sportfieldid) {
        try {

            const result = await axios.post('/api/sportfields/reviewsportfield', { sportfieldid : sportfieldid, value : value })
            console.log(result)
            Swal.fire('Congrats', 'Thank you for your review!', 'succes').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            Swal.fire('Oops', 'Something went wrong!', 'error')
        }


    };

   




    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings.length > 0 && (bookings.map(booking => {
                        return (
                            <div className='bs'>
                                <h1>{booking.sportfield}</h1>
                                <p><b>Date: </b>{booking.date}</p>
                                <p><b>Start Time: </b>{booking.fromhour}</p>
                                <p><b>End Time: </b>{booking.tohour}</p>
                                <p><b>Total time: </b>{booking.totaltime} hours</p>
                                <p><b>Total amount: </b>{booking.totalamount} RON</p>
                                <p><b>Status: </b>
                                    {booking.status == 'cancelled' ? (<Tag color="volcano">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                                </p>
                               
                               {booking.status !=='cancelled' && (
                                <div>
                                
                                <section className='t' style={{backgroundColor: '#000',width:'260px', textAlign: 'center'}}>
                                <Rate
                                    defaultValue={3}
                                    onChange={newValue => {
                                        setValue(newValue);
                                        console.log(newValue);

                                    }}
                                >

                                </Rate>
back

                                <Button type="primary" onClick={() => handleOk(booking.sportfieldid)}>
                                    REVIEW
                                </Button>
                                </section>
                                </div>

                                )}



                                {
                                    booking.status !== 'cancelled' && (<div className='text-right'>
                                        <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.sportfieldid) }}>CANCEL BOOKING</button>
                                    </div>)
                                }


                            </div>
                        )
                    }))}


                </div>
            </div>
        </div >
    )

}
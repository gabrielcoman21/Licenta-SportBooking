import React, {useState,useEffect} from 'react'
import {Tabs} from 'antd'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'



const {TabPane}=Tabs;

function Adminscreen() {

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem('currentUser')).data.isAdmin){
            window.location.href='/home'
        }
    },[])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{fontsize:'30px'}}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings/>
                </TabPane>
                <TabPane tab="Available Sportfields" key="2">
                    <Sportfields/>
                </TabPane>
                <TabPane tab="Add Sportfield" key="3">
                    <Addsportfield/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen



export function Sportfields(){

    const [sportfields, setSportfields] =useState([])
    const [loading,setLoading]=useState(true)
    const [error, setError]=useState()

     useEffect(() => {
    
        const fetchData = async () => {

            try {
              const data = await (await axios.get("/api/sportfields/getallsportfields")).data
              console.log(data)
              setSportfields(data)
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
              setError(false)
              
            }
        }
        // call the function
        fetchData()
        // make sure to catch any error

    }, []);

    return(
        <div className='row'>
            <div className='col-md-12'>
               
                <h1>Sportfields</h1>
                {loading && (<Loader/>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Sportfield ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per hour</th>
                            <th>Max People Allowed</th>
                            <th>Phone Number</th>
                            
                        </tr>
                    </thead>

                    <tbody className='bs'>
                        {sportfields.length && (sportfields.map(booking=>{
                            return(
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.name}</td>
                                    <td>{booking.type}</td>
                                    <td>{booking.rentperhour}</td>
                                    <td>{booking.maxcount}</td>
                                    <td>{booking.phonenumber}</td>
                                   

                                </tr>

                            )
                        
                            }))}
                    </tbody>
                </table>


                
            </div>
        </div>
    )
}




export function Bookings(){

    const [bookings, setBookings] =useState([])
    const [loading,setLoading]=useState(true)
    const [error, setError]=useState()

     useEffect(() => {
    
        const fetchData = async () => {

            try {
              const data = await (await axios.get("/api/bookings/getallbookings")).data
              console.log(data)
              setBookings(data)
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
              setError(false)
              
            }
        }
        // call the function
        fetchData()
        // make sure to catch any error

    }, []);

    return(
        <div className='row'>
            <div className='col-md-12'>
               
                <h1>Bookings</h1>
                {loading && (<Loader/>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Sportfield</th>
                            <th>Date</th>
                            <th>From Hour</th>
                            <th>To Hour</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody className='bs'>
                        {bookings.length && (bookings.map(booking=>{
                            return(
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.sportfield}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.fromhour}</td>
                                    <td>{booking.tohour}</td>
                                    <td>{booking.status}</td>

                                </tr>

                            )
                        
                            }))}
                    </tbody>
                </table>


                
            </div>
        </div>
    )

}


export function Users(){

    const [users, setUsers] =useState([])
    const [loading,setLoading]=useState(true)
    const [error, setError]=useState()


    useEffect(() => {
    
        const fetchData = async () => {

            try {
              const data = await (await axios.get("/api/users/getallusers")).data
              console.log(data)
              setUsers(data)
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
              setError(false)
              
            }
        }
        fetchData()
    }, []);

    return(
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader/>)}
                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (users.map(user=>{
                            return(
                                <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            )
                        }))}

                    </tbody>

                </table>
            </div>

        </div>
    )

}


// Add Sportfield component

export function Addsportfield(){


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [name, setName] =useState('')
    const [rentperhour, setRentperhour] =useState()
    const [maxcount, setMaxcount] =useState()
    const [description, setDescription] =useState()
    const [phonenumber, setPhonenumber] = useState()
    const [type,setType] = useState()
    const [image1, setImage1] =useState()
    const [image2, setImage2] =useState()
    const [image3, setImage3] =useState()


   async function addSportfield(){
        const newsportfield={
            name,
            rentperhour,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[image1, image2, image3]

        }
        try {
            setLoading(true)
            const result = await (await axios.post('/api/sportfields/addsportfield', newsportfield)).data
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', 'New Sportfield Added Successfully!', 'success').then(result=>{
                window.location.hreg='/home'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('OOps','Something went wrong', 'error')
        }
    }

    return(
        <div className='row'>
            <div className='col-md-5'>
            {loading && (<Loader/>)}
                <input type='text'className='form-control' placeholder='Sportfield Name'
                value={name} onChange={(e)=>{setName(e.target.value)}}
                />
                <input type='text'className='form-control' placeholder='Rent per hour'
                value={rentperhour} onChange={(e)=>{setRentperhour(e.target.value)}}
                />   
                <input type='text'className='form-control' placeholder='Max People Allowed'
                value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}
                />   
                <input type='text'className='form-control' placeholder='Description'
                value={description} onChange={(e)=>{setDescription(e.target.value)}}
                />   
                <input type='text'className='form-control' placeholder='Phone number'
                value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}
                />                
            </div>

            <div className='col-md-5'>
                <input type='text'className='form-control' placeholder='Type ( Indoor/Outdoor )'
                value={type} onChange={(e)=>{setType(e.target.value)}}
                />
                <input type='text'className='form-control' placeholder='Image URL 1'
                value={image1} onChange={(e)=>{setImage1(e.target.value)}}
                />   
                <input type='text'className='form-control' placeholder='Image URL 2'
                value={image2} onChange={(e)=>{setImage2(e.target.value)}}
                />   
                <input type='text'className='form-control' placeholder='Image URL 3'
                value={image3} onChange={(e)=>{setImage3(e.target.value)}}
                />    

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addSportfield}>Add Sportfield</button>
                </div>

            </div>
        </div>
    )
}
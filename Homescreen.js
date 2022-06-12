import React, { useState, useEffect } from 'react'
import axios from "axios";
import Sportfield from '../components/Sportfield';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space, TimePicker, RangePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'



function Homescreen() {

    const [sportfields, setSportfields] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const [date, setDate] = useState()
    const [fromhour, setFromhour] = useState()
    const [tohour, setTohour] = useState()
    const [duplicatesportfields, setDuplicatesportfields] = useState();

    const[searchkey, setSearchkey]=useState();
    const[type, setType]=useState('all');

   

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {

            try {
                setLoading(true)
                const data = await axios.get('/api/sportfields/getallsportfields')
                setSportfields(data.data)
                setDuplicatesportfields(data.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        // call the function
        fetchData()
        // make sure to catch any error

    }, []);


    

    function filterbyDate(date) {
        setDate(moment(date).format('DD-MM-YYYY'));

    }

    function filterbyHour(times) {
        setFromhour(moment(times[0]).format('HH-mm'));
        setTohour(moment(times[1]).format('HH-mm'));

        var tempsportfields = []
        var availability = false;

        for (const sportfield of duplicatesportfields) {
            if (sportfield.currentbookings.length > 0) {
                for (const booking of sportfield.currentbookings) {
                    if (!moment(moment(times[0]).format('HH-mm')).isBetween(booking.fromhour, booking.tohour) && !moment(moment(times[1]).format('HH-mm')).isBetween(booking.fromhour, booking.tohour)) {
                        if (
                            moment(times[0]).format('HH-mm') !== booking.fromhour &&
                            moment(times[0]).format('HH-mm') !== booking.tohour &&
                            moment(times[1]).format('HH-mm') !== booking.fromhour &&
                            moment(times[1]).format('HH-mm') !== booking.tohour
                        ) {
                            availability = true;

                        }
                    }
                }
            
            }
            if(availability==true || sportfield.currentbookings.length==0)
            {
                tempsportfields.push(sportfield)
            }
            setSportfields(tempsportfields)
        }
    }


    function filterbySearch(){
        const tempsportfields = duplicatesportfields.filter(sportfield=>sportfield.name.toLowerCase().includes(searchkey.toLowerCase()))
        setSportfields(tempsportfields)
    }


    function filterbyType(e){
        setType(e)
        if(e!=='all'){
            const tempsportfields=duplicatesportfields.filter(sportfield=>sportfield.type.toLowerCase()==e.toLowerCase())
            setSportfields(tempsportfields)
        }
        else{
            setSportfields(duplicatesportfields)
        }
    }

    return (
        <div className='container'>


            <div className='row mt-5 bs'>
                <div className='col-md-2'>
                    <Space direction="vertical">
                        <DatePicker onChange={filterbyDate} format='DD-MM-YYYY' />
                    </Space>
                </div>


                <div className='col-md-3'>
                    <Space direction="vertical">
                        <TimePicker.RangePicker onChange={filterbyHour} format='HH-mm' />
                    </Space>
                </div>


                    <div className='col-md-4'>
                        <input type='text' className='form-control'placeholder='Search sportfield'
                        value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterbySearch}
                        />
                    </div>

                    <div className='col-md-3'>
                    <select className='form-control' value={type} onChange={(e)=>{filterbyType(e.target.value)}}>
                        <option value='all'>All</option>
                        <option value='indoor'>Indoor</option>
                        <option value='outdoor'>Outdoor</option>
                    </select>
                    



                </div>

            </div>


            <div className='row justify-content-center mt-5'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error />
                ) : (
                    sportfields.map((sportfield) => {
                        return <div className='col-md-9 mt-2'>
                            <Sportfield sportfield={sportfield} date={date} fromhour={fromhour} tohour={tohour} />
                        </div>;
                    })
                )}
            </div>
        </div>
    );
}

export default Homescreen

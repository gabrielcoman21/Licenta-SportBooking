import React, {useState,useEffect} from 'react'
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";


function Loginscreen(){

 
    const[email, setEmail]= useState('')
    const[password, setPassword] =useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    

    async function Login(){
      
        const user={
         
            email, 
            password,

        }
        try {
            setLoading(true);
            const result=await axios.post('/api/users/login', user)
            console.log(result.data)
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href='/home'
        } catch (error) {
            console.log(error)
            setLoading(false);
            setError(true);
        }
    }

    return(
        <div>
            {loading && (<Loader/>)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    {error && (<Error message='Email or Password is incorrect!'/>)}
                    <div className='bs'>
                        <h2>Login</h2>
                    
                        <input type="text" className='form-control' placeholder='Email'
                        value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input type="password" className='form-control' placeholder='Password'
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                     

                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Loginscreen
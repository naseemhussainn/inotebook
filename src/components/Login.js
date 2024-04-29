import React, { useState } from 'react'
import { redirect,useNavigate } from "react-router-dom";
import { toast } from 'sonner';

function Login() {
    const [credentials,setCredentials] = useState({email:'',password:''});

    const onchange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let url = 'http://localhost:5000/api/auth/login-user';
        const response = await fetch(url,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:credentials.email,password:credentials.password
            })
        })
        const json = await response.json();
        console.log(json);
        if(json.sucsses){
            let token =  json.authToken;
            localStorage.setItem('Auth-Token',token)
            toast('logined successfuly',{duration: 3000});
            navigate("/");
        }else{
            toast.error(json.errors,{duration: 3000,style: {
                background: 'red',
              }});
        }
    }
    return (
        <>
            <div className='container my-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} value={credentials.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onchange} value={credentials.password}/>
                    </div>
                    <div className='text-center'><button type="submit" className="btn btn-primary">Login</button></div>
                </form>
            </div>
        </>
    )
}

export default Login

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function SignUp() {
    const navigate = useNavigate()
    const [loginDetails,setLoginDetails] = useState({username:'',email:'',password:'',confirmPassword:''})
    const onChange = (e) =>{
        setLoginDetails({...loginDetails,[e.target.name] : e.target.value})
    }
    const submitSignUp = async(e) =>{
        e.preventDefault()
        if(loginDetails.password !== loginDetails.confirmPassword){
            return toast("pasword desn't match");
        }
        let url ='http://localhost:5000/api/auth/create-user'
        const response = await fetch(url,{
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                name:loginDetails.username,email:loginDetails.email,password:loginDetails.password
            })
        })
        let res =  await response.json();
        console.log(response)
        if(res.sucsses){
            let token =  res.authToken;
            localStorage.setItem('Auth-Token',token)
            toast('successfully cretaed a user');
            navigate('/')
        }else{
            toast.error(res.errors,{style:{background:'red'}});
        }

    }
    return (
        <>
            <div className='container my-4' >
                <form onSubmit={submitSignUp}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" minLength={3} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' minLength={5} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' minLength={5} onChange={onChange}/>
                    </div>
                    <div className='text-center'><button type="submit" className="btn btn-primary" >Sign Up</button></div>
                    
                </form>
            </div>
        </>
    )
}

export default SignUp

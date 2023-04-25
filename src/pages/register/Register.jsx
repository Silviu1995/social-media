import './register.css'
import {  useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import swal from 'sweetalert'

const Register = () => {
  const [fetching,setFetching] = useState(false)
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const navigate = useNavigate()
  const registerClick = async (event) =>{
    event.preventDefault() 
    if( password.current.value !== confirmPassword.current.value) 
      { confirmPassword.current.setCustomValidity("Passwords don't match !")
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        }
        try{
          setFetching(true)
          await axios.post('http://localhost:8800/auth/register', user)
          swal({
            title: "Account created!",
            text: "You will be redirected to the login page!",
            icon: "success",
            button: "Continue",
          })
          .then(() => {
          navigate('/login');
          });
          
        } catch(err) {
          console.log(err)
        }
        setFetching(false) 
      }
  }

  return (
    <div className='register' onClick={() => setFetching(false)}>
      <div className="registerWrapper">
        <div className="registerLeft">
            <h3 className="registerLogo">BacaMedia</h3>
            <span className="registerDesc">Connect with friends and the world arround BacaMedia.</span>
        </div>
        <div className="registerRight">
            <div className="registerBox">
              <form onSubmit={registerClick}  className="registerForm">
              <input required minLength='6' ref={username} placeholder='Username' type="text" className="registerInput" />
                <input ref={email} placeholder='Email' type="email" className="registerInput" />
                <input 
                ref={password} 
                placeholder='Password' 
                required
                minLength='6' 
                type="password" 
                className="registerInput" 
                />
                <input 
                ref={confirmPassword} 
                required
                minLength='6' 
                placeholder='Password again' 
                type="password" 
                className="registerInput" 
                />
                <button className="registerButton">{fetching ? <CircularProgress 
                    color='inherit' size='25px'/> :'Sign up'}</button>
              </form>
                <button  onClick={()=> navigate('/login')} className="registerRegisterButton">Log into Account</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Register

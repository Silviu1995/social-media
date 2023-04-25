import './login.css'
import { useRef } from 'react'
import { loginCall } from '../../utils/apiCals'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { CircularProgress } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const email = useRef()
  const navigate = useNavigate()
  const password = useRef()
  const {isFetching,dispatch} = useContext(AuthContext)
  const handleClick = (event) =>{
    event.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)  
  }
  const registerHandler = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">BacaMedia</h3>
            <span className="loginDesc">Connect with friends and the world arround BacaMedia.</span>
        </div>
        <div className="loginRight">
            <div  className="loginBox" >
              <form onSubmit={handleClick} className="loginForm">
                  <input 
                    placeholder='Email' 
                    type="email" 
                    required 
                    className="loginInput" 
                    ref={email}
                    />
                    <input 
                    placeholder='Password' 
                    type="password" 
                    minLength='6'
                    required 
                    className="loginInput" 
                    ref={password} 
                    />
                    <button 
                    className="loginButton">{isFetching ? <CircularProgress 
                    color='inherit' size='25px'/> :'Log in'}
                    </button>
              </form>
                <span className="loginForgot">Forgot Password ?</span>
                <button onClick={registerHandler} className="loginRegisterButton">Register Now </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Login

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Service/Url";
import logo from "./../../assets/images/xacco-logo.png";
import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { base_url } from "../../constant";




const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [loginFormErrors, setLoginFormErrors] = useState({
    email: '',
    password: ''
  })
  const handleChange = (event) => {
    setLoginForm({
      ...loginForm, [event.target.name]: event.target.value
    })
    setLoginFormErrors({
      ...loginFormErrors, [event.target.name]: null
    })
  }
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regText = /[A-Za-z]/
    const { email, password } = loginForm
    const newErrors = {}
    if (!email) {
      newErrors.email = 'please enter user email'
    }
    else if (email && !regText.test(email)) {
      newErrors.email = 'user name should be text'
    }
    else if (email && email.length > 50) {
      newErrors.email = 'username should be below 50 digits'
    }

    if (!password) {
      newErrors.password = 'please enter password'
    } else if (password && password.length > 50) {
      newErrors.password = 'password should be below 50 digits'
    }
    return newErrors

  }

  // eugia$#@!345
  const handleSubmit = async() => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setLoginFormErrors(handleValidationObject)
    } else {
      // setLoader(true)
     
      try {
        const response = await axios.post(`${base_url}/admin/login`,{
          email:loginForm.email,
          password:loginForm.password
        })
        if (response.status === 201) {
          const headers = response.headers;
          localStorage.setItem('x-access-token',headers["x-access-token"]);
          localStorage.setItem("x-refresh-token",headers["x-refresh-token"]);
          // console.log(response?.data.user.email)  
        } 

        navigate('/booking');
        
        // alert('Loged in')
      } catch (error) {
        // alert(error?.response?.error)
        console.log(error?.response?.data?.message)
        alert(error?.response?.data?.message)
      }
    }

  }

  //               

  return (
    <div>
      {" "}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          transition={Zoom}
          delay={500}
          limit={1}
        />
        <div class="login">
          <div className="row" style={{ width: '100%' }}>
            <div className="col-md-12 text-center">
              <img className="login_img" src={logo} alt="" />
            </div>
          </div>

          <h2 class="login-header">Log in </h2>
          <p>
            <input
              type="email"
              placeholder="User Name"
              name='email'
              autoComplete="off"
              value={loginForm.email}
              onChange={handleChange}
            />
            <span className="text-danger" >{loginFormErrors.email}</span>
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              name='password'
              autoComplete="off"
              value={loginForm.password}
              onChange={handleChange}
            />
            <span className="text-danger" >{loginFormErrors.password}</span>
          </p>
          <p
            onClick={handleSubmit}
          >
            {/* <Link to="/dashboard"> */}
            {
              loader == true ? '' :
                <input
                  type="submit"
                  value="Log in"
                />
            }
            {/* </Link> */}
            {
              loader == true && <div style={{ marginLeft: '170px' }} >
                <Spinner animation="border" variant="Primary" />
              </div>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

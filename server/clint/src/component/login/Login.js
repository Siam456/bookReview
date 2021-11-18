import axios from 'axios';
import React, { useState } from 'react';
import LogInImg from './clogin.svg'
import Creg from './creg.svg'
import './Login.css'


const Login = () => {
    const [ user, setuser ] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',

    });

    const [ logininfo, setlogininfo ] = useState({
        username: '',
        password: '',

    })

    const [ avater, setavater ] = useState('');

    //store value in state
    const setvalue = (e) => {
        
        const name = e.target.name;
        const value = e.target.value;

        if(name === 'avater'){
            setavater(e.target.files[0]);
            
        } else{
            setuser((prev) => {
                if(name === 'username'){
                    return({
                        username: value,
                        email: prev.email,
                        phone: prev.phone,
                        password: prev.password,
                        
                    })
                } else if(name === 'email'){
                    return({
                        username: prev.username,
                        email: value,
                        phone: prev.phone,
                        password: prev.password,
                        
                    })
                } else if(name === 'phone'){
                    return({
                        username: prev.username,
                        email: prev.email,
                        phone: value,
                        password: prev.password,
                        
                    })
                } else if(name === 'password'){
                    return({
                        username: prev.username,
                        email: prev.email,
                        phone: prev.phone,
                        password: value,
                        
                    })
                }
            }); 
        }
    }

    //store login info

    const setLoginInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setlogininfo((prev) => {
            if(name === 'usernameL'){
                return({
                    username: value,
                    password: prev.password,
                    
                })
            } else if(name === 'passwordL'){
                return({
                    username: prev.username,
                    password: value,
                    
                })
            }
        });
    }

    //postUser
    const postUser = (e) => {
        e.preventDefault();

        const errorPlaceHolder = document.querySelectorAll('p.pError');
        for(let i = 0 ; i< errorPlaceHolder.length ; i++){
            errorPlaceHolder[i].textContent = '';
        }
        
        const inputError = document.querySelectorAll('input.i-error');
        for( let i = 0 ; i< inputError.length ; i++){
            inputError[i].classList.remove('inputError');
        }

        document.getElementById('error-avater').textContent = ''
        
        const newUSer = JSON.stringify(user);
        const data = new FormData();
        data.append('user',newUSer);
        data.append('avater', avater);


        axios.post('/user', data)
        .then(res => {
            alert('User Added successfully. Login now...');
            document.getElementById('login').style.left = '50%'
            document.getElementById('reg').style.left = '-50%'
        })
        .catch(err => {
            const er = err.response.data.errors;

            if(er){
                Object.keys(er).forEach((errorname) => {
                    document.getElementById(`${errorname}`).classList.add('inputError');
                    document.getElementById(`error-${errorname}`).textContent = er[errorname].msg;
    
                })
            } else{
                document.getElementById('error-avater').textContent = 'upload valid Image';
            }
        })
    }

    //login
    const submitLogin = (e) => {
        e.preventDefault();

        axios.post('/login', logininfo)
        .then(res => {
            window.location.replace(window.location.origin +'/');
        })
        .catch(err => {
            document.getElementById('login-error').textContent = 'Login failed try again'
        })
    }

    //reg
    const reg = (e) => {
        e.preventDefault();
        document.getElementById('login').style.left = '50%'
        document.getElementById('reg').style.left = '-50%'
    }
    const login = (e) => {
        e.preventDefault();
        document.getElementById('login').style.left = '-50%'
        document.getElementById('reg').style.left = '50%'
    }
    return (
        <>
            <div className='wrapper'>
                <div className='loginWrapper' id='login'>
                    <div style={{textAlign: 'center', padding: '20px'}}>
                        <img src={LogInImg} alt='login' height='170px' />
                    </div>
                    <div>
                        <h4 style={{textAlign: 'center', padding: '20px'}}>Login - chat Application</h4>
                        <form method='POST' onSubmit={submitLogin} autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="usernameLogin">Email Phone/username</label>
                                <input onChange={setLoginInfo} type="text" className="form-control" name='usernameL' id="usernameLogin" placeholder="Enter Phone/username" />
                                <small className="form-text text-muted">We'll never share your info with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordLogin">Password</label>
                                <input onChange={setLoginInfo} type="password" className="form-control" name='passwordL' id="passwordLogin" placeholder="Password" />
                                <p className='pError' id='login-error'></p>
                            </div>
                            <div className="form-check">
                                <p style={{textAlign: 'right'}}>Need an <span onClick={login}  style={{color: 'blue', cursor: 'pointer'}} >Account?</span></p>
                            </div>
                            <input style={{marginTop: '0', marginBottom: '30px'}} type="submit" value='Log In' className="btn btn-primary" />
                            </form>
                    </div>
                </div>

                <div className='regWrapper py-2' id='reg'>
                <div style={{textAlign: 'center', padding: '20px'}}>
                    <img src={Creg} alt='login' height='170px' />
                </div>
                <div>
                    <h4 style={{textAlign: 'center', padding: '20px'}}>Reg - chat Application</h4>
                    <form onSubmit={postUser} encType='multipart/form-data' method='POST'>
                    <>
                        <div className="row">
                            <div className="col-sm">
                                <div className="form-group">
                                    <label htmlFor="username">UserName</label>
                                    <input onChange={setvalue} type="text" className="form-control i-error" name='username' id="username" placeholder="Enter username" />
                                    <p id='error-username' className='pError'></p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input onChange={setvalue} type="text" className="form-control i-error" name='phone' id="phone" placeholder="Enter phone" />
                                    <p id='error-phone' className='pError'></p>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-group">
                                    <label htmlFor="email">Email Enter</label>
                                    <input onChange={setvalue} type="email" className="form-control i-error" name ='email' id="email" placeholder="Enter email" />
                                    <p id='error-email' className='pError'></p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input onChange={setvalue} type="password" className="form-control i-error" name='password' id="password" placeholder="Password" />
                                    <p id='error-password' className='pError'></p>
                                </div>
                            </div>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="avater">Set avater</label>
                                    <input onChange={setvalue} type="file" name='avater' className="form-control" id="avater" accept="image/*" />
                                    <p id='error-avater' className='pError'></p>
                                </div>
                            </div>
                        </div>
                        </>
                        
                        <div className="form-check">
                            <p style={{textAlign: 'right'}}>Already Have <span onClick={reg} style={{color: 'blue', cursor: 'pointer'}} >Account?</span></p>
                        </div>
                        <input style={{marginTop: '0', marginBottom: '30px'}} type="submit" value='Sing Up' className="btn btn-primary" />
                        </form>
                </div>
             </div>
            </div>
        </>
    );
};

export default Login;
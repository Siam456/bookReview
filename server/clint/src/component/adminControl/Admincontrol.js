import React, { useState, useEffect } from "react";
import axios from "axios";

const Admincontrol = () => {
  const [userGet, setuserGet] = useState([]);

  const [ avater, setavater ] = useState('');

  const [ user, setuser ] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: 'admin',

});

const [ userEdit, setuserEdit ] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: 'admin',

});

//get data
  const getUser = async () => {
    try {
      const res = await axios.get("/user");
      setuserGet(res.data.response);
      //console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  //store post data

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
                    role: prev.role,
                    
                })
            } else if(name === 'email'){
                return({
                    username: prev.username,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'phone'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                    role: prev.role,
                    })
                }  else if(name === 'role'){
                    return({
                        username: prev.username,
                        email: prev.email,
                        phone: prev.phone,
                        password: prev.password,
                        role: value,
                        })
                    }
            }); 
        }
    }

  //delete user
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`user/${id}`);
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        alert('User Added successfully...');
        window.location.reload();
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

//edit

const openEditModal = (obj) => {
    setuserEdit({
        username: obj.username,
        phone: obj.phone,
        email: obj.email,
        role: obj.role,
        password: ''
    })
}

//store data for edit
const setvalueEdit = (e) => {
        
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'avater'){
        setavater(e.target.files[0]);
        
    } else{
        setuserEdit((prev) => {
            if(name === 'username'){
                return({
                    username: value,
                    email: prev.email,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                    
                })
            } else if(name === 'email'){
                return({
                    username: prev.username,
                    email: value,
                    phone: prev.phone,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'phone'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: value,
                    password: prev.password,
                    role: prev.role,
                })
            } else if(name === 'password'){
                return({
                    username: prev.username,
                    email: prev.email,
                    phone: prev.phone,
                    password: value,
                    role: prev.role,
                    })
                }  else if(name === 'role'){
                    return({
                        username: prev.username,
                        email: prev.email,
                        phone: prev.phone,
                        password: prev.password,
                        role: value,
                        })
                    }
            }); 
        }
    }
//edit User
const editUserPost = (id, i) => {
    

    const errorPlaceHolder = document.querySelectorAll('p.pError');
    for(let i = 0 ; i< errorPlaceHolder.length ; i++){
        errorPlaceHolder[i].textContent = '';
    }
    
    const inputError = document.querySelectorAll('input.i-error');
    for( let i = 0 ; i< inputError.length ; i++){
        inputError[i].classList.remove('inputError');
    }

    document.getElementById('error-avater').textContent = ''
    
    const newUSer = JSON.stringify(userEdit);
    const data = new FormData();
    data.append('user',newUSer);
    data.append('avater', avater);


    axios.put(`/user/${id}`, data)
    .then(res => {
        //alert('User Added successfully...');
        window.location.reload();
    })
    .catch(err => {
        const er = err.response.data.errors;

        console.log(err.response)
        if(er){
            Object.keys(er).forEach((errorname) => {
                document.getElementById(`${errorname}${i}`).classList.add('inputError');
                document.getElementById(`error-${errorname}${i}`).textContent = er[errorname].msg;

            })
        } else{
            document.getElementById(`error-avater${i}`).textContent = 'upload valid Image';
        }
    })
}
  
  return (
    <div className='container'>
      <h2 className='text-success'>Admin panel</h2>

      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#addUSer'
      >
        Add user
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='addUSer'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
              Add User
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form
                onSubmit={postUser}
                encType='multipart/form-data'
                method='POST'
              >
                <>
                  <div className='row'>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <label htmlFor='username'>UserName</label>
                        <input
                          onChange={setvalue}
                          type='text'
                          className='form-control i-error'
                          name='username'
                          id='username'
                          placeholder='Enter username'
                        />
                        <p id='error-username' className='pError'></p>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='phone'>Phone</label>
                        <input
                          onChange={setvalue}
                          type='text'
                          className='form-control i-error'
                          name='phone'
                          id='phone'
                          placeholder='Enter phone'
                        />
                        <p id='error-phone' className='pError'></p>
                      </div>
                    </div>
                    <div className='col-sm'>
                      <div className='form-group'>
                        <label htmlFor='email'>Email Enter</label>
                        <input
                          onChange={setvalue}
                          type='email'
                          className='form-control i-error'
                          name='email'
                          id='email'
                          placeholder='Enter email'
                        />
                        <p id='error-email' className='pError'></p>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                          onChange={setvalue}
                          type='password'
                          className='form-control i-error'
                          name='password'
                          id='password'
                          placeholder='Password'
                        />
                        <p id='error-password' className='pError'></p>
                      </div>
                    </div>
                    <div>
                      <div className='form-group'>
                        <label htmlFor='avater'>Set avater</label>
                        <input
                          onChange={setvalue}
                          type='file'
                          name='avater'
                          className='form-control'
                          id='avater'
                          accept='image/*'
                        />
                        <p id='error-avater' className='pError'></p>
                      </div>
                    </div>
                  </div>
                    <select onChange={setvalue} name='role' className="form-control">
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                    </select> <br />
                </>

               
                <input
                  style={{ marginTop: "0", marginBottom: "30px" }}
                  type='submit'
                  value='Add User'
                  className='btn btn-primary'
                />
              </form>
            </div>
            
          </div>
        </div>
      </div>

      <div style={{ overflow: "auto" }}>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Avater</th>
              <th scope='col'>Info</th>
              <th scope='col'>Join</th>
              <th scope='col'>Role</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userGet.map((v, i) => {
              let UserImage =
                "https://tanzolymp.com/images/default-non-user-no-photo-1.jpg";
              if (v.avater) {
                UserImage = window.location.origin + `/userUpload/${v.avater}`;
              }

              //date
              const date = new Date(v.createdAt);
              var hours = date.getHours();
              var minutes = date.getMinutes();
              var ampm = hours >= 12 ? "pm" : "am";
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? "0" + minutes : minutes;
              var strTime = hours + ":" + minutes + ampm;

              var formatedDate =
                date.getMonth() +
                1 +
                "-" +
                date.getDate() +
                "-" +
                date.getFullYear() +
                "  " +
                strTime;

              return (
                <tr key={i}>
                  <th scope='row'>{i + 1}</th>
                  <td>
                    <div
                      style={{
                        height: "50px",
                        width: "50px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img src={UserImage} alt='siam' height='50px' />
                    </div>
                  </td>
                  <td style={{ minWidth: "170px" }}>
                    {v.username}
                    <br />
                    <i className='fas fa-at'></i> {v.email}
                    <br />
                    <i className='fas fa-phone-alt'></i> {v.phone}
                  </td>
                  <td> {formatedDate}</td>
                  <td> {v.role}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button className='btn btn-primary'
                      data-toggle='modal'
                      data-target={'#editUser'+i}
                      onClick={() => openEditModal(v)}>Edit</button>
                      
                      {/* <!-- Modal --> */}
                        <div
                            className='modal fade'
                            id={'editUser'+i}
                            tabindex='-1'
                            role='dialog'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                        >
                            <div className='modal-dialog' role='document'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModalLabel'>
                                Add User
                                </h5>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                >
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                                </div>
                                <div className='modal-body'>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        editUserPost(v._id, i);
                                    }}
                                    encType='multipart/form-data'
                                    method='POST'
                                >
                                    <>
                                    <div className='row'>
                                        <div className='col-sm'>
                                        <div className='form-group'>
                                            <label htmlFor='username'>UserName</label>
                                            <input
                                            onChange={setvalueEdit}
                                            type='text'
                                            className='form-control i-error'
                                            name='username'
                                            id={'username'+i}
                                            value={userEdit.username}
                                            placeholder='Enter username'
                                            />
                                            <p id={'error-username'+i} className='pError'></p>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='phone'>Phone</label>
                                            <input
                                            onChange={setvalueEdit}
                                            type='text'
                                            className='form-control i-error'
                                            name='phone'
                                            id={'phone'+i}
                                            value={userEdit.phone}
                                            placeholder='Enter phone'
                                            />
                                            <p id={'error-phone'+i} className='pError'></p>
                                        </div>
                                        </div>
                                        <div className='col-sm'>
                                        <div className='form-group'>
                                            <label htmlFor='email'>Email Enter</label>
                                            <input
                                            onChange={setvalueEdit}
                                            type='email'
                                            className='form-control i-error'
                                            name='email'
                                            id={'email'+i}
                                            value={userEdit.email}
                                            placeholder='Enter email'
                                            />
                                            <p id={'error-email'+i} className='pError'></p>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='password'>Password</label>
                                            <input
                                            onChange={setvalueEdit}
                                            type='password'
                                            className='form-control i-error'
                                            name='password'
                                            value={userEdit.password}
                                            id={'password'+i}
                                            placeholder='Password'
                                            />
                                            <p id={'error-password'+i} className='pError'></p>
                                        </div>
                                        </div>
                                        <div>
                                        <div className='form-group'>
                                            <label htmlFor='avater'>Set avater</label>
                                            <input
                                            onChange={setvalueEdit}
                                            type='file'
                                            name='avater'
                                            className='form-control'
                                            id={'avater'+i}
                                            accept='image/*'
                                            />
                                            <p id={'error-avater'+i} className='pError'></p>
                                        </div>
                                        </div>
                                    </div>
                                        <select defaultValue='admin' onChange={setvalueEdit} name='role' className="form-control">
                                            <option value='admin'>Admin</option>
                                            <option value='user'>User</option>
                                        </select> <br />
                                    </>

                                
                                    <input
                                    style={{ marginTop: "0", marginBottom: "30px" }}
                                    type='submit'
                                    value='Add User'
                                    className='btn btn-primary'
                                    />
                                </form>
                                </div>
                                
                            </div>
                            </div>
                        </div>

                       &nbsp;
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteUser(v._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admincontrol;

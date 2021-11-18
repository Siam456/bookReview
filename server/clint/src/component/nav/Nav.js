import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Login from '../login/Login';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Admincontrol from '../adminControl/Admincontrol';
import Bookpost from '../Bookpost/Bookpost';
import Bookreview from '../review/Bookreview';
import Bookreviewall from '../review/Bookreviewall';
import Reward from '../reward/Reward';


const Nav = () => {
    const [user, setuser] = useState({
		_id: "",
		name: "",
		email: "",
		phone: "",
		role: "",
	});

    
    useEffect(() => {
        let unmount = true;
        axios.get('/userprofile')
        .then(res => {
            if(unmount){
                setuser(res.data.profile);
                
            }
        })
        .catch(err => console.log(err));

        return(() => {
            unmount = false;
        })
    }, ['/userprofile']);


    const logOut = async () => {
		try{
            const res = await axios.get("/logout");
            if(res){
                window.location.replace(window.location.origin +"/login");
            }

        } catch(err){
            console.log(err.resonse)
        }
		
	};

    
    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent: 'space-between'}}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">admin</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/postbook">postBook</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/review">Review</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/reward">Reward</NavLink>
                            </li>
                            
                        </ul>
                        <div className="form-inline m-2 my-lg-0" style={{display: 'flex'}}
                        onChange={(e) => {
                            e.preventDefault();
                        }}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            {user._id === '' ? <NavLink className="btn btn-outline-success" to='/login'>login</NavLink> : 
                            <button onClick={logOut} className="btn btn-outline-success my-2 my-sm-0" type="submit">logout</button>}
                        </div>
                    </div>
                </nav>


                <Switch>
                    <Route exact path='/'><Home name={user} /> </Route>
                    <Route exact path='/login'><Login /> </Route>
                    <Route exact path='/admin'><Admincontrol /> </Route>
                    <Route exact path='/postbook'><Bookpost /> </Route>
                    <Route exact path='/reward'><Reward /> </Route>
                    <Route exact path='/review/:id/:title'><Bookreview user={user} /> </Route>
                    <Route exact path='/review'><Bookreviewall user={user} /> </Route>
                </Switch>
            </Router>
        </>
    );
};

export default Nav;
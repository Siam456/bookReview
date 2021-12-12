import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './reward.css'
import Fst from './fst.jpg'
import Sec from './sec.jpg'
import Trd from './trd.jpg'

const Reward = () => {
    const [ user, setUser ] = useState([]);
    
    const [ firstByMnth, setfirstByMnth ] = useState({
        count: 0,
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        axios.get('/user')
        .then(res => setUser(res.data.response))
        .catch(err => console.log(err));
        
        return () => {
            
        }
    }, []);

    //custom js
    const liOne = () => {
        var lione = document.getElementById('li_one');
        var liTwo = document.getElementById('li-two');
        var liThree = document.getElementById('li-three');

        lione.classList.add('activeX');
        liTwo.classList.remove('activeX');
        liThree.classList.remove('activeX');

        //for component

        var overall = document.getElementById('overall');
        var mnth = document.getElementById('mnth');
        var year = document.getElementById('year');

        overall.classList.remove('hide');
        mnth.classList.add('hide');
        year.classList.add('hide');
    }
    const liTwo = () => {
        var lione = document.getElementById('li_one');
        var liTwo = document.getElementById('li-two');
        var liThree = document.getElementById('li-three');

        lione.classList.remove('activeX');
        liTwo.classList.add('activeX');
        liThree.classList.remove('activeX');

         //for component

         var overall = document.getElementById('overall');
         var mnth = document.getElementById('mnth');
         var year = document.getElementById('year');
 
         overall.classList.add('hide');
         mnth.classList.remove('hide');
         year.classList.add('hide');

    }
    const liThree = () => {
        var lione = document.getElementById('li_one');
        var liTwo = document.getElementById('li-two');
        var liThree = document.getElementById('li-three');

        lione.classList.remove('activeX');
        liTwo.classList.remove('activeX');
        liThree.classList.add('activeX');

         //for component

         var overall = document.getElementById('overall');
         var mnth = document.getElementById('mnth');
         var year = document.getElementById('year');
 
         overall.classList.add('hide');
         mnth.classList.add('hide');
         year.classList.remove('hide');
    }
    return (
        <div className='container'>
            <div className='suBNav'>
                <ul className='subUl'>
                    <li onClick={liOne} id='li_one' className='subLi activeX'>Overall</li>
                    <li onClick={liTwo} id='li-two' className='subLi'>This Month</li>
                    <li onClick={liThree} id='li-three' className='subLi'>This Year</li>
                </ul>

            </div>
            <div id='overall'>
                {user.map((v, i) => {
                    var image = <span></span>
                    if(i===0){
                        image = <img src={Fst} alt={i} height='150px' />
                    } else if(i===1){
                        image = <img src={Sec} alt={i} height='150px' />
                    } else if(i===2){
                        image = <img src={Trd} alt={i} height='150px' style={{marginLeft: '15px'}} />
                    }
                    if(i<3){
                        return(
                            <div className='mainReward'>
                                <div style={{width: '20%'}}> {image}</div>
                                <div style={{marginTop: '30px', marginLeft: '50px'}}>
                                    <h5>
                                        {v.username}
                                    </h5>
                                    <span>
                                        <i style={{color: '#EB4E41'}} className="fas fa-envelope"></i> {v.email}
                                    </span> <br/>
                                    <span>
                                        <i className="fas fa-mobile-alt"></i> {v.phone}
                                    </span>
                                </div>
                            </div>
                            
                        )
                    } else{
                        return(<span></span>)
                    }
                })}
            </div>
            {/* {console.log(user)} */}

            <div id='mnth' className='hide'>
            {user.map((v, i) => {
                    var image = <span></span>
                    if(i===0){
                        image = <img src={Fst} alt={i} height='150px' />
                    } else if(i===1){
                        image = <img src={Sec} alt={i} height='150px' />
                    } else if(i===2){
                        image = <img src={Trd} alt={i} height='150px' style={{marginLeft: '15px'}} />
                    }

                                     
                    
                    return(
                        <div className='mainReward'>
                            {/* <div style={{width: '20%'}}> {image}</div>
                            <div style={{marginTop: '30px', marginLeft: '50px'}}>
                                <h5>
                                    {v.username}
                                </h5>
                                <span>
                                    <i style={{color: '#EB4E41'}} className="fas fa-envelope"></i> {v.email}
                                </span> <br/>
                                <span>
                                    <i className="fas fa-mobile-alt"></i> {v.phone}
                                </span>
                            </div> */}
                            {v.review.map((review, ind) => {
                                 const date = new Date(review.create); 
                                 const mnth = date.getMonth();

                                 const dateNow = new Date(); 
                                 const mnthNow = dateNow.getMonth();

                                 

                                return( <div>
                                    {typeof(mnthNow)} <br/><span> </span>
                                    {typeof(firstByMnth.count)}
                                </div>)
                            })}
                        </div>
                        
                    )
                })}
            </div>

            {/* last div */}
            <div id='year' className='hide'>
                {user.map((v, i) => {
                    return(
                        <div>{v.username}</div>
                        
                    )
                })}
                vvvvvvvv
            </div>
            
        </div>
    );
};

export default Reward;
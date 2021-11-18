import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import './review.css'

const Bookreviewall = (params) => {
    const { username, avater } = params.user;

    const [reviewX, setreviewX] = useState({
        review: '',
        reating: 0,
    })


    //clean up
    const cleanUp = () =>{
        setreviewX({
            review: '',
            reating: 0,
        })
    }
    const setval = (e) => {
        const { value,name } = e.target;
        //console.log(reviewX)
        if(name === 'review'){
            setreviewX((prev) => {
                return({
                    review: value,
                    reating: prev.reating,
                })
            });
        } else if(name === 'rating'){
            setreviewX((prev) => {
                return({
                    review: prev.review,
                    reating: value,
                })
            });
        }
    }

    //post review
    const pReview = () => {
        //e.preventDefault()
        alert('x')
    }


    return (
      <div className='container'>
        all review {avater}
        <h3 className='text-primary my-2' style={{ textAlign: "center" }}>
          All Review
        </h3>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "70px",
              width: "70px",
              overflow: "hidden",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #a1bae3",
            }}
          >
            <img
              src={window.location.origin + "/userUpload/" + avater}
              alt='siam'
              width='70px'
            />
          </div>
          <div
            className='text-muted'
            data-toggle='modal'
            data-target='#postReview'
            style={{
              background: "#afb4c4",
              padding: "10px",
              width: "500px",
              borderRadius: "10px",
              marginLeft: "10px",
              cursor: "pointer",
              height: "70px",
            }}
          >
            What's on your mind, {username}?
          </div>
        </div>
        {/* <!-- post review --> */}
        <div
          className='modal fade'
          id='postReview'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  Add Review
                </h5>
                <button
                  onClick={cleanUp}
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form onSubmit={(e)=> {
                    e.preventDefault()
                    pReview();
                    }}>
                  <input
                    value={reviewX.review}
                    onChange={setval}
                    className='form-control'
                    name='review'
                    placeholder='Write Review Here....'
                  />
                  &nbsp;{" "}
                  {[...Array(5)].map((star, i) => {
                    var ratingValue = i + 1;
                    return (
                      <label>
                        <input
                          onChange={setval}
                          type='radio'
                          name='rating'
                          value={ratingValue}
                        />
                        <FaStar
                          className='star'
                          color={
                            ratingValue <= reviewX.reating
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        />
                      </label>
                    );
                  })}
                  <br />
                  <button
                    onClick={cleanUp}
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  <input type='submit' className='btn btn-primary m-2' value='Save changes' />
                    
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Bookreviewall;
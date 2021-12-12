import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Bookpost/bookpost.css'
import { Link } from "react-router-dom";

const Story = () => {
  const [book, setbook] = useState({
    title: "",
    author: "",
    publication: "",
    publishedyear: null,
    catagory: "story",
  });

  const [avater, setavater] = useState();

  const [bookGet, setbookGet] = useState([]);

  //getdata
  

  useEffect(() => {
    let unmount = true;
    axios
      .get("/book")
      .then((res) => {
        if (unmount) {
          setbookGet(res.data.book);
          //console.log(bookGet)
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmount = false;
    };
  }, [bookGet]);

  //store value in state
  const setvalue = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "image") {
      setavater(e.target.files[0]);
      console.log(avater);
    } else {
      setbook((prev) => {
        if (name === "title") {
          return {
            title: value,
            author: prev.author,
            publication: prev.publication,
            publishedyear: prev.publishedyear,
            catagory: prev.catagory,
          };
        } else if (name === "authorName") {
          return {
            title: prev.title,
            author: value,
            publication: prev.publication,
            publishedyear: prev.publishedyear,
            catagory: prev.catagory,
          };
        } else if (name === "publicationName") {
          return {
            title: prev.title,
            author: prev.author,
            publication: value,
            publishedyear: prev.publishedyear,
            catagory: prev.catagory,
          };
        } else if (name === "publishedYear") {
          return {
            title: prev.title,
            author: prev.author,
            publication: prev.publication,
            publishedyear: Date.parse(value),
            catagory: prev.catagory,
          };
        } else if (name === "catagory") {
          return {
            title: prev.title,
            author: prev.author,
            publication: prev.publication,
            publishedyear: prev.publishedyear,
            catagory: value,
          };
        }
      });
    }
  };

   //post book
  //postUser
  const postUser = (e) => {
    e.preventDefault();

    const newbook = JSON.stringify(book);
    const data = new FormData();
    data.append("book", newbook);
    data.append("avater", avater);

    axios
      .post("/book", data)
      .then((res) => {
        alert("User Added successfully...");
        window.location.reload();
      })
      .catch((err) => {
        //const er = err.response.data.errors;
        console.log(err.response.data);
      });
  };



  return (
    <div className='container'>
      <h2 className='text-success'>Story</h2>
      

      <div className='row my-3'>
        {bookGet.slice(0).reverse().map((v,i) => {
            let url = 'https://previews.123rf.com/images/segawa7/segawa71805/segawa7180500056/102576552-fresh-green-leaves.jpg';
            if(v.avatar){
                url = window.location.origin+ `/bookUpload/${v.avatar}`;
            }
            const date = new Date(v.publishedyear);
            var year = date.getFullYear();
			var mnth = date.getMonth();
            if(v.catagory === 'story'){
                return(
                    <span key={i} className='col-sm-12 col-md-6 col-lg-4 my-2'>
                        <div className="card" style={{width: '18rem', margin: 'auto'}}>
                            <img className="card-img-top" src={url} alt="Card" />
                            <div className="card-body">
                                <h5 className="card-title">{v.title}</h5>
                                <p className="card-text"><span className='text-muted'>Author</span> : {v.author}</p>
                                <p className="card-text"><span className='text-muted'>Publication</span> : {v.publication}</p>
                                <p className="card-text"><span className='text-muted'>Published Year</span> : {mnth}/{year}</p>
                                <p className="card-text"><span className='text-muted'>
                                        <Link to={`/review/${v._id}/${v.title}`} className='review' data-toggle="modal" data-target={`#review${i}`}>
                                            Review
                                        </Link>
                                    </span> : {v.review.length}</p>
                                <p className="card-text"><span className='text-primary'><i className="fas fa-grip-horizontal"></i></span> {v.catagory}</p>
                                <div style={{display: 'flex'}}>
                                    
                                </div>
                            </div>
                            </div>
                        
                        
                       
                    </span>
                )
            } else{
                return (<span></span>)
            }
        })}
      </div>



      {/* <!-- add book --> */}
      <div
        className='modal fade'
        id='addbook'
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Add Book
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
                method='POST'
                onSubmit={postUser}
                encType='multipart/form-data'
              >
                <div className='form-group'>
                  <label for='booktitle'>Book Title</label>
                  <input
                    required
                    onChange={setvalue}
                    name='title'
                    type='text'
                    className='form-control'
                    id='booktitle'
                    placeholder='Book Title'
                  />
                </div>

                <div className='form-group'>
                  <label for='authorName'>Author Name</label>
                  <input
                    required
                    onChange={setvalue}
                    name='authorName'
                    type='text'
                    className='form-control'
                    id='authorName'
                    placeholder='Author Name'
                  />
                </div>
                <div className='form-group'>
                  <label for='publicationName'>Publication Name</label>
                  <input
                    required
                    onChange={setvalue}
                    name='publicationName'
                    type='text'
                    className='form-control'
                    id='publicationName'
                    placeholder='Publication Name'
                  />
                </div>
                <div className='form-group'>
                  <label for='publishedYear'>Published Year</label>
                  <input
                    required
                    onChange={setvalue}
                    name='publishedYear'
                    type='date'
                    className='form-control'
                    id='publishedYear'
                    placeholder='Published Year'
                  />
                </div>

                <div className='form-group'>
                  <label for='bookCoverImage'>Book Cover Image</label>
                  <input
                    onChange={setvalue}
                    name='image'
                    type='file'
                    className='form-control'
                    id='bookCoverImage'
                    placeholder='Book Cover Image'
                  />
                </div>

                <div className='form-group'>
                  <label for='catagory'>Catagory</label>
                  <select
                    onChange={setvalue}
                    name='catagory'
                    defaultValue='story'
                    className='form-control'
                  >
                    <option value='story'>Story</option>
                    <option value='novel'>Novel</option>
                    <option value='friction'>Friction</option>
                    <option value='sports'>Sports</option>
                  </select>{" "}
                  <br />
                </div>

                <button type='submit' className='btn btn-primary'>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Story;

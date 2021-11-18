import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import "./review.css";
import axios from "axios";
import RealTimeAgo from "react-timeago";

const Bookreview = (params) => {
  const { id, title } = useParams();
  const { username, avater, _id } = params.user;

  const [reviewX, setreviewX] = useState({
    review: "",
    reating: 0,
  });

  const [reviewEdit, setreviewEdit] = useState({
    review: "",
    reating: 0,
  });

  const [reviewGet, setreviewGet] = useState([]);
  const [comment, setcomment] = useState({
    comment: "",
  });

  //clean up
  const cleanUp = () => {
    setreviewX({
      review: "",
      reating: 0,
    });
    setreviewEdit({
      review: "",
      reating: 0,
    });
  };

  //get data

  let unmount = true;
  useEffect(() => {
    axios
      .get(`/review/${id}`)
      .then((res) => {
        if (unmount) {
          setreviewGet(res.data.review);
          //console.log(reviewGet)
        }
      })
      .catch((err) => console.log(err));

    return () => {
      unmount = false;
    };
  }, [reviewGet]);

  //store
  const setval = (e) => {
    const { value, name } = e.target;
    //console.log(reviewX)
    if (name === "review") {
      setreviewX((prev) => {
        return {
          review: value,
          reating: Number(prev.reating),
        };
      });
    } else if (name === "rating") {
      setreviewX((prev) => {
        return {
          review: prev.review,
          reating: Number(value),
        };
      });
    }
  };

  //post review
  const pReview = () => {
    //e.preventDefault()
    axios
      .post(`/review/${id}`, reviewX)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //like unlike
  const likeUnlike = (id, status) => {
    var body = {
      status: status,
    };
    axios
      .patch(`/review/${id}/${_id}`, body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //delete status
  const statusDelete = (id) => {
    axios
      .delete(`/review/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //comment
  const submitComment = (id, i) => {
    axios
      .post(`/review/comment/${id}`, comment)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    
      document.getElementById(`comment_inputx${i}`).value = '';

    setcomment(() => {
      return {
        comment: "",
      };
    });
  };

  //delete comment
  const deleteCommentx = (statusid, id) => {
    axios
      .delete(`/review/comment/${statusid}/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //edit

  //set val edit
  const setvalEdit = (e) => {
    const { value, name } = e.target;
    //console.log(reviewX)
    if (name === "review") {
      setreviewEdit((prev) => {
        return {
          review: value,
          reating: Number(prev.reating),
        };
      });
    } else if (name === "rating") {
      setreviewEdit((prev) => {
        return {
          review: prev.review,
          reating: Number(value),
        };
      });
    }
  };

  //edit comment
  const editCommentx = (statusid, id) => {};
  //post edit
  const pReviewEdit = (id) => {
    axios
      .put(`/review/${id}`, reviewEdit)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className='container'>
        <h3 className='text-primary my-2' style={{ textAlign: "center" }}>
          {title}'s Review
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
            {avater ? (
              <img
                src={window.location.origin + "/userUpload/" + avater}
                alt='siam'
                width='70px'
              />
            ) : (
              <img
                src='https://www.pngkey.com/png/detail/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png'
                alt='siam'
                width='70px'
              />
            )}
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

        <div className='my-5 wrapper'>
          {reviewGet
            .slice(0)
            .reverse()
            .map((v, i) => {
              let userUrl =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_WFCawR4Qq1ZxvBhwzDb9o7L1R1cRX9-aGsiCELnf-dbhhrtEtl5L1W8Ze_pychpZIs&usqp=CAU";
              if (v.user.avater) {
                userUrl =
                  window.location.origin + "/userUpload/" + v.user.avater;
              }

              return (
                <div key={i} className='fullreview'>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          height: "50px",
                          width: "50px",
                          overflow: "hidden",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid #a1bae3",
                        }}
                      >
                        <img src={userUrl} alt='siam' width='50px' />
                      </span>
                      <span>
                        <span className='mx-2'>{v.user.username}</span> <br />
                        <span className='mx-2'>
                          <RealTimeAgo date={v.createdAt} />
                        </span>
                      </span>
                    </div>
                    {v.user.id === _id ? (
                      <div>
                        <i
                          data-toggle='modal'
                          onClick={() => {
                            setreviewEdit({
                              review: v.review,
                              reating: v.reating,
                            });
                          }}
                          data-target='#editReview'
                          style={{ cursor: "pointer" }}
                          className='far fa-edit'
                        ></i>{" "}
                        &nbsp;
                        {/* <!-- edit review --> */}
                        <div
                          className='modal fade'
                          id='editReview'
                          tabIndex='-1'
                          role='dialog'
                          aria-labelledby='exampleModalLabel'
                          aria-hidden='true'
                        >
                          <div className='modal-dialog' role='document'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <h5
                                  className='modal-title'
                                  id='exampleModalLabel'
                                >
                                  Edit Review
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
                                <form
                                  autoComplete='off'
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    pReviewEdit(v._id);
                                  }}
                                >
                                  <input
                                    required
                                    value={reviewEdit.review}
                                    onChange={setvalEdit}
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
                                          onChange={setvalEdit}
                                          type='radio'
                                          name='rating'
                                          value={ratingValue}
                                        />
                                        <FaStar
                                          className='star'
                                          color={
                                            ratingValue <= reviewEdit.reating
                                              ? "#ffc107"
                                              : "gray"
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
                                  <input
                                    type='submit'
                                    className='btn btn-primary m-2'
                                    value='Save changes'
                                  />
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* editmodal end */}
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => statusDelete(v._id)}
                          className='fas fa-minus-circle'
                        ></i>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  {/* body */}
                  <div className='reviewBody m-3'>
                    {v.review.length < 30 ? (
                      <h3>{v.review}</h3>
                    ) : (
                      <p>{v.review}</p>
                    )}
                    {[...Array(5)].map((x, i) => {
                      var ratingValue2 = i + 1;
                      return (
                        <FaStar
                          className='star'
                          color={ratingValue2 <= v.reating ? "#ffc107" : "gray"}
                        />
                      );
                    })}
                  </div>
                  {/* likeComment */}
                  <div className='likeComment'>
                    <span>
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {v.like.includes(_id) ? (
                          <i
                            onClick={(e) => {
                              likeUnlike(v._id, "unlike");
                            }}
                            className='fas fa-thumbs-up'
                          ></i>
                        ) : (
                          <i
                            onClick={(e) => {
                              likeUnlike(v._id, "like");
                            }}
                            className='far fa-thumbs-up'
                          ></i>
                        )}
                      </span>
                      <span>
                        &nbsp; {v.like.length === 0 ? "" : v.like.length}
                      </span>
                    </span>
                    <span>
                      {v.comment.length === 0 ? "" : v.comment.length}
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        comment
                      </span>
                    </span>
                  </div>
                  {/* comment */}
                  <br />
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        height: "40px",
                        width: "40px",
                        overflow: "hidden",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #a1bae3",
                      }}
                    >
                      {avater ? (
                        <img
                          src={window.location.origin + "/userUpload/" + avater}
                          alt='siam'
                          width='70px'
                        />
                      ) : (
                        <img
                          src='https://www.pngkey.com/png/detail/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png'
                          alt='siam'
                          width='70px'
                        />
                      )}
                    </div>

                    <form
                      style={{ width: "100%", display: "flex" }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitComment(v._id, i);
                      }}
                    >
                      <input
                        onChange={(e) => {
                          setcomment(() => {
                            return {
                              comment: e.target.value,
                            };
                          });
                        }}
                        id={`comment_inputx${i}`}
                        type='text'
                        className='form-control m-1'
                        placeholder='add comment...'
                      />
                      <button className='btn btn-light m-1'>
                        <i className='far fa-paper-plane'></i>
                      </button>
                    </form>
                  </div>
                  {/* comment display */}
                  <div
                    style={{
                      marginLeft: "50px",
                    }}
                  >
                    {v.comment
                      .slice(0)
                      .reverse()
                      .map((commentp, commentIndex) => {
                        return (
                          <div
                            className='my-3'
                            key={commentIndex}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <span
                                style={{
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #a1bae3",
                                  }}
                                >
                                  {commentp.userinfo.avater ? (
                                    <img
                                      src={
                                        window.location.origin +
                                        "/userUpload/" +
                                        commentp.userinfo.avater
                                      }
                                      alt='siam'
                                      width='40px'
                                    />
                                  ) : (
                                    <img
                                      src='https://www.pngkey.com/png/detail/503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png'
                                      alt='siam'
                                      width='40px'
                                    />
                                  )}
                                </div>
                              </span>

                              <span
                                style={{ display: "block" }}
                                className='mx-3'
                              >
                                <span>{commentp.userinfo.username}</span> <br />
                                <span className='text-muted'>
                                  {commentp.text}
                                </span>
                                <br />
                                <span>
                                  <RealTimeAgo date={commentp.create} />
                                </span>
                              </span>
                            </div>
                            {commentp.userinfo.id === _id ||
                            v.user.id === _id ? (
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {/* <i
                              onClick={() =>
                                editCommentx(v._id, commentp._id)
                              }
                              className='far fa-edit'
                            ></i> */}

                                <i
                                  onClick={() =>
                                    deleteCommentx(v._id, commentp._id)
                                  }
                                  className='fas fa-minus-circle'
                                ></i>
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
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
                <form
                  autoComplete='off'
                  onSubmit={(e) => {
                    e.preventDefault();
                    pReview();
                  }}
                >
                  <input
                    required
                    value={reviewX.review}
                    onChange={setval}
                    className='form-control'
                    name='review'
                    placeholder='Write Review Here....'
                  />
                  &nbsp;{" "}
                  {[...Array(5)].map((star, i) => {
                    var ratingValue = i +1;
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
                            ratingValue <= reviewX.reating ? "#ffc107" : "gray"
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
                  <input
                    type='submit'
                    className='btn btn-primary m-2'
                    value='Save changes'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookreview;

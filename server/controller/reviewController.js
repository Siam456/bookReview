const reviewModel = require("../model/reviewModel");
const bookModel = require("../model/bookModel");
const userModel = require("../model/userModel");

const getReview = async (req, res) => {
  try {
    const response = await reviewModel.find({});
    res.json({
      review: response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const getReviewbyId = async (req, res) => {
  try {
    const response = await reviewModel.find({ "book.id": req.params.id });
    res.json({
      review: response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const postReview = async (req, res) => {
  try {
    //console.log(req.params.id);
    //console.log(req.body);
    const review = new reviewModel({
      ...req.body,
      user: {
        id: req.user._id,
        username: req.user.username,
        phone: req.user.phone,
        email: req.user.email,
        avater: req.user.avater,
        role: req.user.role,
      },
      book: {
        id: req.params.id,
      },
    });

    const response = await review.save();
    //console.log(response._id)
    const bookFind = await bookModel.findByIdAndUpdate(
      { _id: response.book.id },
      {
        $push: { review: response._id },
      }
    );
      //const userAddReview = await userModel.findOne({_id: bookFind.user.id})
      const userAddReview = await userModel.findByIdAndUpdate(
        {_id: req.user._id},
        {
          $push: { review: {
            reivewid: response._id,
            bookid: response.book.id,
            bookTitle: bookFind.title,
            bookauthor: bookFind.author,
            bookCatagory: bookFind.publication,
            publishedyear: bookFind.publishedyear
        }
     },
        }
      );
      //console.log(bookFind);

    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const likeComment = async (req, res) => {
  let check = false;
  try {
    const review = await reviewModel.findOne({ _id: req.params.id });

    for (let element of review.like) {
      if (req.params.userId === element.toString()) {
        check = true;
        break;
      }
    }

    let response;

    if (check) {
      console.log("like");
      response = await reviewModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { like: req.params.userId } }
      );
    } else {
      console.log("unlike");
      response = await reviewModel.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { like: req.params.userId } }
      );
    }
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const response = await reviewModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comment: {
            text: req.body.comment,
            userinfo: {
              id: req.user._id,
              username: req.user.username,
              phone: req.user.phone,
              email: req.user.email,
              avater: req.user.avater,
              role: req.user.role,
            },
          },
        },
      }
    );
    //console.log(response)
    res.json({
      response,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
};

const deletetComment = async (req, res) => {
    try {
        const review = await reviewModel.findOne(
        { _id: req.params.id })

        //console.log(review.comment); 
        for(const element of review.comment){
            //console.log(element);
            //console.log(typeof(element._id.toString()));
            //console.log(typeof(req.params.commentId));

            if(element._id.toString() === req.params.commentId){
                //console.log(element)

                const response = await reviewModel.findByIdAndUpdate(
                    { _id: req.params.id },
                    {
                      $pull: {
                        'comment': {
                            _id: element._id
                        },
                      },
                    }
                  );


               
            }
        }
        res.json({
            response: 'deleted',
        })

    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  };

  const deletetStatus = async (req, res) => {
  //console.log(req.params.id)
    try {
        const reviewq = await reviewModel.findByIdAndDelete(
        { _id: req.params.id })

        //console.log(review);
        //console.log()
        const reviewR = await bookModel.findByIdAndUpdate(
            { _id: reviewq.book.id },
            {
              $pull: { review: reviewq.id },
            }
          );

          //console.log(review.user.id)

          const reviewRU = await userModel.findOne(
            { _id: reviewq.user.id });
          
            //console.log(reviewRU.review)
          
            for(let element of reviewRU.review){
              // console.log(typeof(reviewq._id) + 'sss')
              // console.log(typeof(element.reivewid))
              // console.log(reviewq._id + 'qqq')
              // console.log(element.reivewid)
              if(element.reivewid.toString()===reviewq._id.toString()){
                const reviewRUqq = await userModel.findByIdAndUpdate(
                  { _id: reviewq.user.id },
                    {
                      $pull: { review: {
                        reivewid: reviewq._id
                      } },
                    });
              }
            }

          //   
          // );
          //console.log(reviewRU);
 
        res.json({
            response: 'deleted',
        })

    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  };

  const editReview = async (req, res) => {
    //console.log(req.body)
      try {
          const response = await reviewModel.findByIdAndUpdate({_id: req.params.id},{
              $set: { review: req.body.review, reating: req.body.reating} 
          })
          res.json({
            response,
        })
  
      } catch (err) {
        res.status(500).json({
          err: err.message,
        });
      }
    };
  


module.exports = {
  getReview,
  postReview,
  getReviewbyId,
  likeComment,
  addComment,
  deletetComment,
  deletetStatus,
  editReview
};

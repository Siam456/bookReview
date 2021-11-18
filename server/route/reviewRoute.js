const express = require("express");

const route = express.Router();

const {
  getReview,
  postReview,
  getReviewbyId,
  likeComment,
  addComment,
  deletetComment,
  deletetStatus,
  editReview
} = require("../controller/reviewController");
const checkLogin = require("../middleware/common/checklogin");

route.get("/", checkLogin, getReview);
route.post("/:id", checkLogin, postReview);

route.put("/:id", checkLogin, editReview);

route.get("/:id", checkLogin, getReviewbyId);
route.patch("/:id/:userId", checkLogin, likeComment);

route.delete("/:id", checkLogin, deletetStatus);

route.post("/comment/:id", checkLogin, addComment);
route.delete("/comment/:id/:commentId", checkLogin, deletetComment);

module.exports = route;

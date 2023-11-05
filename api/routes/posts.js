const router = require("express").Router();
const { json } = require("express");
const blogusers = require("../models/User");
const posts = require("../models/Post");
const bcrypt = require("bcrypt");

//create
router.post("/", async (req, res) => {
  const newPost = new posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    console.log(post)
    if (!post) {
        return res.status(404).json("Post not found");
      }
    if (post.username === req.body.username) {
      try {
        await post.deleteOne(); 
        res.status(200).json("Post deleted successfully!");
      } catch (err) {
        console.error(err);
        res.status(500).json("An error occurred while deleting the post.");
      }
    } else {
      res.status(401).json("Cannot delete others posts");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred while deleting the post.");
  }
});

//get all posts 
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

  try {

    let postss;
    if(username){
        postss=await posts.find({username})
    }else if(catName){
        postss = await posts.find({categories:{
            $in:[catName]
        }})
    }else{
        postss =await posts.find();
    }
    res.status(200).json(postss)
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post by id
router.get("/:id",async(req,res)=>{
  try{
      const post = await posts.findById(req.params.id)
   
      res.status(200).json(post)
  }catch(err){
      res.status(500).json(err)
  }
})

module.exports = router;

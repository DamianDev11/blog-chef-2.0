const router = require("express").Router();
const { json } = require("express");
const blogusers = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcrypt")

//update
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updateUser = await blogusers.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updateUser)
            
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Unauthorized")
    }
    
})


//delete
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        
        try{
            const user = await blogusers.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})
                await blogusers.findByIdAndDelete(req.params.id)
                res.status(200).json("User deleted successfully");
                    
                }catch(err){
                    res.status(500).json(err)
                }
        }catch(err){
            res.status(400).json("No user found!")
        }
    }else{
        res.status(401).json("Unauthorized")
    }
    
})

//get
router.get("/:id",async(req,res)=>{
    try{
        const user = await blogusers.findById(req.params.id)
        const {password,...others} =    user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
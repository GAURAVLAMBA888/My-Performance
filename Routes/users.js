const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Marks = require("../models/Marks");
const bcrypt = require("bcrypt");

//GET
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set : req.body
                },
                {
                    new : true
                }
            );
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can update only your INFO");
    }
});

//Delete
router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            try{
                await Marks.DeleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                console.log(res);
                res.status(200).json("User has been deleted");
            }catch(err){
                res.status(500).json(err);
            }
        } catch(err){
            res.status(404).json("User Not Found!");
        }   
    } else {
        res.status(401).json("You can delete only your account!");
    }
})

module.exports = router;
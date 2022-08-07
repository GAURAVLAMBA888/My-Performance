const express = require("express");
const router = express.Router();
const { Subject } = require("../models/Marks");
const { Mark } = require("../models/Marks");

//Create Subject
router.post("/", async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        res.status(200).json(savedSubject);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Update subject
router.put("/:id", async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    if (subject.username === req.body.username) {
        try {
            const updatedSubject = await Subject.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedSubject);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you can update your Marks ONLY!");
    }
});


//get All Subjects for a particular user 

router.get("/" ,async (req,res) => {
    const username = req.query.user;
    try{
        const subject = await Subject.find({username});
        res.status(200).json(subject);
    }catch(err){
        res.status(500).json(err);
    }
})

//get subject
router.get("/:id", async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        res.status(200).json(subject);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete subject
router.delete("/:id", async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    if (subject.username === req.body.username) {
        try {
            await Subject.findByIdAndDelete(req.params.id);
            res.status(200).json("Subject Deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you can Delete your Subjects ONLY!");
    }
});



//create marks add new marks
router.put("/:id/marks", async (req, res) => {
    if (req.params.id === req.body.userId) {
        try {
            const newMarks = new Mark(req.body);
            const savedSubject = await Subject.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { data: newMarks },
                },
                {new : true}
            );
            res.status(200).json(savedSubject);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can enter your marks only.");
    }
});


//delete marks
router.put("/:id/marks/:idm", async (req, res) => {
    if (req.params.id === req.body.userId) {
        const fetchSubject = await Subject.findById(req.params.id);
        const savedSubject = await fetchSubject.updateOne(
            {
                $pull: { data: {_id:req.params.idm}},
            },
            {new : true}
        );
        res.status(200).json("Removed Successfully");
    } else {
        res.status(403).json("You can enter your marks only.");
    }
});

module.exports = router;

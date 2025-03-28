const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes" Login Required

router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{

    const notes = await Note.find({user: req.user.id});
    res.json(notes);
    }
    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//Route 2: Add a new Note using: POST "/api/notes/addnote" Login Required

router.post("/addnote",fetchuser,[
    body("title","Enter a valid title").isLength({min:3}),
    body("description","Description must be atleast 5 characters").isLength({min:5}),
],async (req,res)=>{
    try {
    const{title,description,tag} = req.body;

     //if there are errors then return bad request and the errors.
     const errors = validationResult(req);
     if(!errors.isEmpty())
         return res.status(400).json({errors: errors.array()});

    const note = new Note({
        title,description,tag,user: req.user.id
    });

    const savedNote = await note.save();
    res.json(savedNote); 

    } 
    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 3: Update an existing Note using: PUT "/api/notes/updatenote" Login Required
router.put("/updatenote/:id",fetchuser, async (req,res)=>{

    const {title,description,tag} = req.body;

    try {
    //Create a newNote Object
    const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});
    }

    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote" Login Required
router.delete("/deletenote/:id",fetchuser, async (req,res)=>{

    try {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not Found");
    }
    //delete only if user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Your note has been deleted","note": note});
    }

    //catching any other errors.
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
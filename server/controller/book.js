let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with book model
let Book = require('../models/book');
/* CRUD Operation*/

module.exports.displayBookList = (req,res,next)=>{
    Book.find((err, booklist)=>{
        if(err)
        {
            return console.error(err); 
        }
        else
        {
            //console.log(booklist);
           res.render('book/list',{
                title:'Books', 
                Booklist: booklist,
                displayName: req.user ? req.user.displayName:''  
            }) 
        }
    });
}

module.exports.displayAddPage = (req,res,next)=> {
    res.render('book/add',{
        title:'Add Book',
        displayName: req.user ? req.user.displayName:''  
    })
}

module.exports.processAddPage = (req,res,next)=> {
    let newBook = Book ({
     "name":req.body.name,
     "author":req.body.author,
     "published":req.body.published,
     "description": req.body.description,
     "price":req.body.price
    });
    Book.create(newBook,(err,Book) => {
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         res.redirect('/book-list');
     }
    })
 
 }

 module.exports.displayEditPage = (req,res,next)=> {
    let id = req.params.id;
    Book.findById(id,(err,bookToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('book/edit',{title:'Edit Book', 
            book:bookToEdit,
            displayName: req.user ? req.user.displayName:''  });
        }
    });
}

 module.exports.processEditPage = (req,res,next)=> {
    let id=req.params.id;
    let updateBook = Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.published,
        "description": req.body.description,
        "price":req.body.price
    });
    Book.updateOne({_id:id},updateBook,(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/book-list');
        }
    });
}

module.exports.performDelete = (req,res,next)=> {
    let id =req.params.id;
    Book.deleteOne({_id:id},(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/book-list');
        }
    });
}
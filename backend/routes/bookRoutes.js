import express from "express";
import { Book } from "../models/bookModel.js";
const bookRouter = express.Router();
bookRouter.post("/", async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message:'Enter all the fields'});
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(200).send(book);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});
bookRouter.get("/", async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

bookRouter.get("/:id", async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

bookRouter.put("/:id", async (request, response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return respond.status(404).send({message: "Enter all the required fields"});
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).send({message: "Book not found"});
        }

        return response.status(200).send({message: "book updated successfully"});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});
bookRouter.delete("/:id", async(request, response) => {
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message: "Book not found"});
        }
        return response.status(200).send({message:"Your Book has been successfully deleted"});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});
export default bookRouter;
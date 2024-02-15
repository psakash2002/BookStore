import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";
const app=express();
//middleware to parse request
app.use(express.json());
//option 1: 
app.use(cors());

//option 2:
// app.use(cors({
//     origin:'http://localhost:8080',
//     methods:['GET', 'POST', 'DELETE', 'PUT'],
//     allowedHeaders:['Content-Type']
// }));
app.get("/", (request, response) => {
    return response.status(432).send("My MERN recap");
});
app.use("/books", bookRouter);
mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("Connected to mongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });


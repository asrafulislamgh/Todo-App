const express = require("express");
const app =express();
const {MongoClient} = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json())

// Database Connection 
// const uri = `mongodb+srv://todo_app:$todo_app123123@cluster0.ofdcm.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ofdcm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});


async function run() {
    try {
        await client.connect();
        const database = client.db("todo_db");


        // API 


    }
    finally{
        console.log("Testing")

    }
}
run().catch(console.dir);






app.get("/", (req, res)=>{
    res.send("Bismillahir Rahmanir rahim")
})





app.listen(port, ()=>{
    console.log("The backend is running on port: ", port)
})
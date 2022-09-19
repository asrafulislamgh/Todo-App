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
        const taskCollections = database.collection("todo_collection");


        // API 
        // Get API 
        app.get("/alltasks", async (req, res)=> {
            const cursor = taskCollections.find({});
            const result = await cursor.toArray();
            res.json(result);
        })
        // Post API 
        app.post("/alltasks", async (req, res)=> {
            const cursor = req.body;
            const result = await taskCollections.insertOne(cursor); 
            res.json(result)
            console.log("data inserted:", result)
        })

        // Delete API 
        app.delete("/alltasks/:id", async (req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await taskCollections.deleteOne(query);
            res.json(result)
            console.log("deleted id:", result)
        })
        // Updating API 
        app.put("/alltasks/:id", async (req, res)=> {
            const id = req.params.id;
            const data = req.body;
            const query = {_id: ObjectId(id)}
            const updatedDoc = {
                $set: {
                    taskName: data.taskName,
                    time: data.time,
                }
            }
            const result = await taskCollections.updateOne(query, updatedDoc);
            res.json(result)
            console.log("Updated id:", data)
        })


    }
    finally{

    }
}
run().catch(console.dir);






app.get("/", (req, res)=>{
    res.send("Bismillahir Rahmanir rahim. Alhamdulillah")
})





app.listen(port, ()=>{
    console.log("The backend is running on port: ", port)
})
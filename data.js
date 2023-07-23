// const mongoose=require('mongoose');
// const express=require('express');
// const morgan=require('morgan');
// const CollegeData = require('./model');
// // const cors = require('cors');
// const app = express();
// mongoose.connect("mongodb+srv://sai:Gajjala1713@cluster0.lb8jeij.mongodb.net/mernstack?retryWrites=true&w=majority")
//     .then(() => console.log('DB Connection established'))
//     .catch(err => console.error('DB Connection error:', err));

// app.use(express.json());
// app.use(express.static('public'));
// app.use(morgan('default'));
// console.log(CollegeData);
// app.get("/", (req, res) => {
//     res.send("App is Working");
// });

// app.get("/roll_no", async (req, res) => {
//     try {
//         const { roll_number} = req.body;
//         console.log(roll_number);
//         const col = await CollegeData.find({ "roll_number": roll_number }).toArray();
//         res.json(col);
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.listen(5000,()=>{
//     console.log('Server running...')
// })
const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const CollegeData = require('./model');
const { MongoClient } = require('mongodb');
const app = express();
const uri = 'mongodb+srv://sai:Gajjala1713@cluster0.lb8jeij.mongodb.net/mernstack?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);
var collectionData=undefined;
async function main() {
    try {
        await client.connect();
        // const collectionData = client.db('mernstack').collection('CollegeData');
        //   const documents = await collectionData.find({college:'College C'}).toArray();
        //   console.log('Documents:', documents);
        collectionData=client.db('mernstack').collection('CollegeData');
        console.log("Data base connected");
    } catch (err) {
        console.error('Error:', err);
    }
}
main();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('default'));
app.get("/",async(req,res)=>{
    try {
        const documents = await collectionData.find({}).toArray();
        res.json(documents);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get("/roll_no", async (req, res) => {
    try {
        const { roll_number } = req.query;
        console.log(roll_number);
        const documents = await collectionData.find({ "roll_number": roll_number }).toArray();
        res.json(documents);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get("/college",async(req,res)=>{
    try {
        const { college } = req.query;
        console.log(college);
        const documents = await collectionData.find({ "college":college }).toArray();
        console.log('Documents:', documents);
        res.json(documents);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get("/clgAndDept",async(req,res)=>{
    try {
        const { college,department } = req.query;
        console.log(college);
        const documents = await collectionData.find({ "college":college,"department":department}).toArray();
        console.log('Documents:', documents);
        res.json(documents);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.listen(5000, () => {
    console.log('Server running...')
})

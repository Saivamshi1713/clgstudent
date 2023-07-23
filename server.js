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
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('default'));
app.use(cors({origin:"*"}))
app.get("/roll_no", async (req, res) => {
    try {
        const { roll_number } = req.body;
        console.log(roll_number);
        // const collectionData = client.db('mernstack').collection('CollegeData');
        const documents = await collectionData.find({ "roll_number": roll_number }).toArray();
        console.log('Documents:', documents);
        res.json(documents);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get("/college",async(req,res)=>{
    try {
        const { college } = req.body;
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
        const { college,department } = req.body;
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

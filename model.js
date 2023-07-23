const mongoose = require('mongoose');

let CollegeData=new mongoose.Schema({
    name :{
        type : String
    },
    email :{
        type : String
    },
    roll_number :{
        type : String
    },
    college : {
        type : String
    },
    department : {
        type:String
    }
})

module.exports = mongoose.model('CollegeData',CollegeData)

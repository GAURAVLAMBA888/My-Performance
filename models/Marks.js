const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
    {
        marks:{
            type:Number,
            required:true,
        },
        date: {
            type:Date,
            default:Date.now
        }
    }
);

const subjectSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        data:[
            marksSchema
        ]
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model("Subject", subjectSchema);
const Mark = mongoose.model("Mark", marksSchema);

module.exports = {
    Subject : Subject,
    Mark : Mark
}
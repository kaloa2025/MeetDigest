const mongoose = require('mongoose')


const meetSchema = new mongoose.Schema({
    title:String,
    dateTime:String
});

module.exports = mongoose.model("details",meetSchema);
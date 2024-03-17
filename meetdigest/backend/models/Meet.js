const mongoose=require('mongoose')
const{ Schema }=mongoose;

const  MeetSchema = new mongoose.Schema({
        id: String,
        title: String,
        date: String
    });
module.exports=mongoose.model('Meet',MeetSchema)
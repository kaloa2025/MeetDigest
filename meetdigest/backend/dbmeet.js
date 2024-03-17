// const mongoose =require('mongoose');
// const mongoURI="mongodb+srv://kaloa2025:aalok21004@cluster0.xgpa9vt.mongodb.net/hackhive?retryWrites=true&w=majority&appName=Cluster0";
// const mongoDB = async () => {
//     try {
//       await mongoose.connect(mongoURI);
//       console.log('Connected!');
      
//       const fetched_data = mongoose.connection.db.collection("meetdata");
//         const data = await fetched_data.find({}).toArray();
//         global.meet = data;
//         console.log('Data fetched and stored successfully.');
//     } catch (error) {
//       console.log('err: ', error);
//     }
//   };
//   module.exports=mongoDB;

// const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://kaloa2025:aalok21004@cluster0.xgpa9vt.mongodb.net/hackhive?retryWrites=true&w=majority&appName=Cluster0";

// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1); // Exit process with failure
//     }
// };

console.log("starting")
const mongoose =require('mongoose');
const mongoURI='mongodb://localhost:27017/hackhive';
// const mongoURI='mongodb+srv://kaloa2025:aalok21004@cluster0.xgpa9vt.mongodb.net/hackhive?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = () => {
    try {
      mongoose.connect(mongoURI);
      console.log('Connected!');
      const meet=require('./models/Meet');
      const fetched_data = mongoose.connection.db.collection('meets');
        const mdata = fetched_data.find({}).toArray();
        global.meetdata = mdata;
        console.log('Data fetched and stored successfully.');
    }catch(error){
      console.log('err: ', error);
    }
  };
  module.exports=mongoDB;
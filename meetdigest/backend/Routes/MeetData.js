const express =require('express')
const router=express.Router()

router.post('/meetinfo',(req,res)=>
{
    try {
        console.log('Meet Data:', global.meetdata);

        res.send([global.meetdata]);
        
    } catch (error) {
        console.error(error.message);
        res.send("Sever Error")
    }
})
module.exports=router;
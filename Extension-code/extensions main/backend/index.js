const express = require('express');
require('./db/config');
const Detail = require('./db/detail');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.post("/meetDetailinsert", async (req, resp) => {
    const details = new Detail(req.body);
    const result = await details.save();
    resp.send(result);
});

app.listen(5000);
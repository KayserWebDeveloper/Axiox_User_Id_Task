const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/routes");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/thirdTask',{useNewUrlParser:true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
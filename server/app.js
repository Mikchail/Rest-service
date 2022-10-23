// require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/routers');
const cookieParser = require('cookie-parser')
const app = express();
const errorMiddleware = require("./src/middlewares/errors");
const PORT = 3000;


app.use(express.json())
app.use(cookieParser()); 
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  const DBoptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };

  try {
    await mongoose.connect("mongodb://admin:admin@mongo_rest:27017/admin", DBoptions);
    console.log('Database connect!')
    app.listen(PORT, () => {
      console.log('Server started!', PORT)
    });
  } catch (err) {
    console.log(err)
  }

}

start()
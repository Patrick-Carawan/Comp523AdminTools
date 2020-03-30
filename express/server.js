const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
require('./models/user.model');
require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const proposalRouter = require('./routes/proposal');

app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.use('/proposals', proposalRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
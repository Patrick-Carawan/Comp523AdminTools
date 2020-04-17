const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

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
const reportRouter = require('./routes/report');
const rosterRouter = require('./routes/roster');
const meetingRouter = require('./routes/coachMeeting');
const semesterRouter = require('./routes/semester');

app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.use('/proposals', proposalRouter);
app.use('/finalReports', reportRouter);
app.use('/roster', rosterRouter);
app.use('/coachMeetings', meetingRouter);
app.use('/semesters', semesterRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

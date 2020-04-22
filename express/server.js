const express = require('express');
const path = require('path'); // Module to work with directories
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
// const errorHandler = require('errorhandler');

require('dotenv').config();

// Setting up app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false })); // May not need this line
app.use(express.json());

// if(!isProduction) {
//   app.use(errorHandler);
// }


// Configure and connect to mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.set('debug', true);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Routes and Models
require('./models/user.model');
require('./config/passport');
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

// if(!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('523-admin-tools-frontend/build'))
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
